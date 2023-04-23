<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import DOMPurify from 'dompurify'
import _ from 'lodash'
import { useTodoStore } from '../../stores/todoStore'

const inputTodoRef = ref('')

// store
const todoStore = useTodoStore()
const { categoryList } = storeToRefs(todoStore)

// get uniqueID
const getUniqueId = () => {
  return Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))
}

// return an index, data, and length of the chosen category of the user
const currentUsed = computed(() => {
  const index = categoryList.value.map((item) => item.isUsed).indexOf(true)
  const data = categoryList.value.filter((item) => item.isUsed)

  const deepClone = _.cloneDeep(categoryList.value[index]?.todoList)
  const reverseList = deepClone?.reverse()

  return { index, length: data.length, reverseList }
})

const onSubmitHandler = () => {
  if (inputTodoRef.value === '') {
    return
  }
  if (DOMPurify.sanitize(inputTodoRef.value) === '') {
    inputTodoRef.value = ''
    return
  }

  const checkerList = (): boolean => {
    return currentUsed.value.reverseList.some((item: any) => {
      return item.list === inputTodoRef.value
    })
  }

  if (!checkerList()) {
    todoStore.addList({ id: getUniqueId(), isChecked: false, list: inputTodoRef.value })
  }

  // reset
  if (inputTodoRef.value) {
    inputTodoRef.value = ''
  }
  console.log(categoryList.value)
}

// removing a list
function removeTodoList(argTodoList: any) {
  todoStore.removeList(argTodoList)
}

// changing the isChecked to true or false
function changeChecked(argList: any) {
  todoStore.changeIsChecked(argList)
}
</script>

<template>
  <div class="flex w-full flex-col items-center justify-center gap-4">
    <form class="w-full" @submit.prevent="onSubmitHandler">
      <label htmlFor="todoList">
        <div class="w-full">
          <input
            :disabled="!currentUsed.length"
            autoComplete="off"
            placeholder="Write a new task..."
            class="h-11 w-full rounded-2xl bg-[#D9D9D9] px-6 py-4 text-xs font-normal outline-0 placeholder:text-xs placeholder:font-normal focus:bg-white md:text-sm placeholder:md:text-sm lg:h-16 lg:text-base placeholder:lg:text-base"
            v-model.trim="inputTodoRef"
          />
        </div>
      </label>
    </form>

    <div class="scrollbar-hide flex h-[68vh] w-full flex-col gap-3 overflow-auto">
      <div
        v-for="(item, index) in currentUsed.reverseList"
        class="flex min-w-full items-center rounded-2xl bg-white px-6 py-4"
        :key="index"
      >
        <div class="flex h-auto w-full items-center gap-4">
          <div
            v-if="!item.isChecked"
            @click="changeChecked(item)"
            class="h-[1.25rem] w-[1.25rem] cursor-pointer rounded-lg bg-[#D9D9D9] md:h-[1.813rem] md:w-[1.813rem] md:rounded-[0.625rem]"
          />
          <div
            v-else
            @click="changeChecked(item)"
            class="flex h-[1.25rem] w-[1.25rem] cursor-pointer items-center justify-center rounded-lg bg-black md:h-[1.813rem] md:w-[1.813rem] md:rounded-[0.625rem]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 1024 1024"
              class="scale-75 text-white md:scale-100"
            >
              <path
                fill="currentColor"
                d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5L207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
              />
            </svg>
          </div>
          <p
            :class="`w-full break-all text-xs font-normal md:text-sm lg:text-base ${
              item.isChecked && 'line-through decoration-2'
            }`"
          >
            {{ item.list }}
          </p>
        </div>
        <button
          @click="removeTodoList(item)"
          class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-[#EB4747]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
            class="text-center"
          >
            <path
              fill="currentColor"
              d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
