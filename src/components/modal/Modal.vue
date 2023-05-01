<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable-next-line vue/multi-word-component-names -->
<script setup lang="ts">
import { defineProps, ref } from 'vue'
import DOMPurify from 'dompurify'
import { useTodoStore } from '../../stores/todoStore'

// props
// const props = defineProps({
//   toggleModalToClose: {
//     type: Function,
//     default: () => {
//       console.log('Default function')
//     }
//   }
// })
// const props = defineProps({
//   toggleModalToClose: {
//     type: Function,
//     default: () => {
//       console.log('Default function')
//     }
//   }
// })

// states
const modalCurrent = ref(1)
const inputNameRef = ref('')

// store
const todoStore = useTodoStore()

const continueHandler = () => {
  if (modalCurrent.value === 3) {
    // props.toggleModalToClose()
    return
  }
  modalCurrent.value = modalCurrent.value + 1
}

const addNameHandler = () => {
  if (inputNameRef.value) {
    if (inputNameRef.value === '') {
      return
    }
    if (DOMPurify.sanitize(inputNameRef.value) === '') {
      inputNameRef.value = ''
      return
    }
  }

  if (inputNameRef.value) {
    continueHandler()
    todoStore.addName(inputNameRef.value)
  }
}

const firebaseHandler = () => {
  console.log('not yet implemented')
}

console.log(defineProps)
</script>

<template>
  <div class="modal-background-back absolute inset-0 z-50">
    <div class="flex h-full w-full items-center justify-center">
      <div
        class="modal-background h-full w-full p-10 shadow-2xl md:h-[31.25rem] md:w-[31.25rem] md:rounded-2xl"
      >
        <div class="flex h-2/4 items-center justify-center">
          <img src="/dona_Avatar.svg" alt="logo" class="rounded-2xl bg-white p-4 shadow-2xl" />
        </div>
        <div class="flex h-2/4 items-center">
          <div>
            <div v-if="modalCurrent === 1">
              <h2 class="mb-2 text-xl font-medium">Welcome to React Todo</h2>
              <p class="mb-7 w-3/5 text-sm text-gray-500">
                React Todo is a back to-do list focused on fast and delightful user experience.
              </p>
            </div>
            <div v-else-if="modalCurrent === 2">
              <h2 class="mb-2 text-xl font-medium">Powerful lists</h2>
              <p class="mb-7 w-3/5 text-sm text-gray-500">
                Organize your tasks into fully customizable lists.
              </p>
            </div>
            <div v-else-if="modalCurrent === 3">
              <h2 class="mb-2 text-xl font-medium">What's your name?</h2>
              <div class="mb-7">
                <input type="text" placeholder="Type it here..." v-model.trim="inputNameRef" />
              </div>
            </div>

            <button
              v-if="modalCurrent !== 3"
              class="mb-7 rounded-lg bg-[#008FFD] px-6 py-3 text-sm text-white hover:bg-[#007cdb] hover:shadow-lg md:px-5 md:py-2"
              @click="continueHandler"
            >
              Continue
            </button>

            <div v-if="modalCurrent === 3">
              <div class="flex gap-2">
                <button
                  class="mb-7 rounded-lg bg-[#008FFD] px-6 py-3 text-sm text-white hover:bg-[#007cdb] hover:shadow-lg md:px-5 md:py-2"
                  @click="addNameHandler"
                >
                  Continue
                </button>
                <button
                  class="mb-7 flex items-center rounded-lg border bg-white px-6 py-3 text-sm text-[#008FFD] shadow-lg md:px-5 md:py-2"
                  @click="firebaseHandler"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    class="mr-1 inline w-4"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path
                        d="M16 20h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3v16zM5 20h3V4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1zM16 4l-4 4l-4-4"
                      />
                      <path d="m4 6.5l8 7.5l8-7.5" />
                    </g>
                  </svg>
                  Gmail
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center">
          <svg viewBox="0 0 70 10" width="70">
            <circle
              cx="5"
              cy="5"
              r="5"
              :fill="`${modalCurrent === 1 ? '#008FFD' : '#d9d9d9'}`"
            ></circle>
            <circle
              cx="25"
              cy="5"
              r="5"
              :fill="`${modalCurrent === 2 ? '#008FFD' : '#d9d9d9'}`"
            ></circle>
            <circle
              cx="45"
              cy="5"
              r="5"
              :fill="`${modalCurrent === 3 ? '#008FFD' : '#d9d9d9'}`"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
