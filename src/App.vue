<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { format } from 'date-fns'
import { storeToRefs } from 'pinia'
import { useTodoStore } from './stores/todoStore'
import SideBar from './components/sidebar/SideBar.vue'
import TodoList from './components/todoList/TodoList.vue'
import Modal from './components/modal/Modal.vue'

// states
const isModalOpen = ref(false)
const date = new Date()
const day = format(date, 'iiii')
const month = format(date, 'MMM')
const dayNum = format(date, 'dd')
const periodFN = () => {
  const tempPeriod = format(date, 'a')
  if (tempPeriod === 'PM') {
    return 'afternoon'
  } else {
    return 'morning'
  }
}

// store
const todoStore = useTodoStore()
const { name } = storeToRefs(todoStore)

const toggleModalToClose = () => {
  isModalOpen.value = false
}

onMounted(() => {
  const todoDataLocal = localStorage.getItem('todo-data')
  const todoNameLocal = localStorage.getItem('todo-name')

  if (!todoNameLocal) {
    isModalOpen.value = true
    todoStore.addName('Human')
  }
  if (todoNameLocal) {
    todoStore.addName(JSON.parse(todoNameLocal))

    if (JSON.parse(todoNameLocal) === 'Human') {
      isModalOpen.value = true
    }
  }
  if (todoDataLocal) {
    todoStore.allCategory(JSON.parse(todoDataLocal))
  }
})
</script>

<template>
  <Modal v-if="isModalOpen === true" @toggleModalToClose="toggleModalToClose" />

  <main class="relative flex h-screen w-screen gap-7 bg-[#EAEDEE] p-10">
    <SideBar />

    <section class="flex h-[90vh] w-full flex-col items-center gap-7 lg:w-[66%]">
      <div class="flex w-full flex-col gap-4 md:w-[100%]">
        <div class="mt-9 flex w-full justify-start">
          <div class="flex gap-5">
            <div class="w-full">
              <h1
                class="w-full text-xl font-normal leading-none text-black md:text-2xl lg:text-3xl"
              >
                Good {{ periodFN() }} {{ name }}
              </h1>
              <p class="text-base font-normal leading-6 text-[#6D6D6D] md:text-base lg:text-2xl">
                It&apos;s {{ day }}, {{ month }} {{ dayNum }}
              </p>
            </div>
          </div>
        </div>
        <TodoList />
      </div>
    </section>
  </main>
</template>
