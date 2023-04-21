import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    name: 'Human',
    categoryList: [
      {
        id: 1,
        categoryName: 'Home',
        isUsed: true,
        todoList: []
      }
    ]
  }),
  actions: {
    addName(argName: string) {
      this.name = argName
      localStorage.setItem('todo-name', JSON.stringify(this.name))
    },
    allCategory(argTodo: []) {
      this.categoryList = argTodo
    },
    addCategory(argCategory: any) {
      this.categoryList = [...this.categoryList, argCategory]
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    },
    removeCategory(argId: any) {
      this.categoryList = this.categoryList.filter((item) => {
        if (argId !== item.id) {
          return item
        }
      })
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    },
    changeIsUsed(argCategory: any) {
      this.categoryList = this.categoryList.map((item) => {
        if (argCategory.categoryName === item.categoryName) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: true,
            todoList: item.todoList
          }
        }
        return {
          id: item.id,
          categoryName: item.categoryName,
          isUsed: false,
          todoList: item.todoList
        }
      })
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    }
  }
})
