<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import DOMPurify from 'dompurify'
import { useTodoStore } from '../../stores/todoStore'

// types
type todoListType = {
  id: number
  isChecked: boolean
  list: string
}
type categoryType = {
  id: number
  categoryName: string
  isUsed: boolean
  todoList: todoListType[]
}

// states
const inputRef = ref('')

// store
const todoStore = useTodoStore()
const { categoryList } = storeToRefs(todoStore)

// get uniqueID
const getUniqueId = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}

// checker, will return boolean
const checkerCategory = (argCategoryName: string) => {
  return categoryList.value.some((item: categoryType) => {
    return item.categoryName.toLowerCase() === argCategoryName.toLowerCase()
  })
}

const newCategory = {
  id: 2,
  categoryName: 'Work',
  isUsed: true,
  todoList: []
}
const onSubmitHandler = () => {
  if (inputRef.value === '') {
    return
  }
  if (DOMPurify.sanitize(inputRef.value) === '') {
    inputRef.value = ''
    return
  }

  if (!checkerCategory(inputRef.value)) {
    const newCategory = {
      id: getUniqueId(),
      categoryName: inputRef.value,
      isUsed: false,
      todoList: []
    }
    todoStore.addCategory(newCategory)
    todoStore.changeIsUsed(newCategory)
  }
  if (inputRef.value) {
    inputRef.value = ''
  }

  // reset
  inputRef.value = ''
}

// to select the target category
const onClickHandler = (argCategory: categoryType) => {
  todoStore.changeIsUsed(argCategory)
}

// to delete the target category
const onDeleteClickHandler = (argCategory: categoryType) => {
  todoStore.removeCategory(argCategory.id)
}
</script>

<template>
  <aside
    class="hidden h-[90vh] w-[44%] justify-center rounded-[20px] bg-white p-10 md:w-[34%] lg:inline-flex"
  >
    <div class="scrollbar-hide h-[82vh] w-full overflow-auto">
      <div class="flex max-w-full flex-col gap-4">
        <div v-for="(item, index) in categoryList" :key="index">
          <div
            :class="`py-5 ${
              item.isUsed && 'bg-[#EAEDEE]'
            }  flex h-auto cursor-pointer items-center justify-between rounded-[20px] px-6`"
            @click="onClickHandler(item)"
          >
            <div class="flex items-center">
              <img
                src="/dona_Avatar.svg"
                alt="dona_Avatar"
                class="max-h-[15px] max-w-[15px]"
                width="200"
                height="200"
              />
              <p class="break-all px-3 text-base font-normal text-black">
                {{ item.categoryName }}
              </p>
            </div>
            <div v-if="item.categoryName === 'Home'">
              <p
                class="max-w-11 flex max-h-7 items-center justify-center rounded-lg bg-[#D9D9D9] px-2 py-[0.15rem] text-[#6D6D6D]"
              >
                {{ item.todoList.length }}
              </p>
            </div>
            <div
              v-else
              class="max-w-11 item-custom flex max-h-7 cursor-pointer items-center justify-center rounded-lg bg-[#D9D9D9] px-2 py-[0.15rem] text-[#6D6D6D] hover:bg-[#EB4747]"
              @click="onDeleteClickHandler(item)"
            >
              <p class="new-label">
                <span>{{ item.todoList.length }}</span>
              </p>
            </div>
          </div>
        </div>
        <div class="flex h-16 w-full items-center justify-center gap-8 px-6 py-4">
          <div class="text-xl">+</div>
          <form class="w-full" @submit.prevent="onSubmitHandler">
            <input
              autoComplete="off"
              placeholder="Create new category..."
              class="line-clamp-3 w-full text-sm outline-0 placeholder:text-sm placeholder:font-normal"
              v-model="inputRef"
            />
          </form>
        </div>
      </div>
    </div>
  </aside>
</template>
