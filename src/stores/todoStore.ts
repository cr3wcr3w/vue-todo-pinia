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
    },
    addList(argTodoList: any) {
      this.categoryList = this.categoryList.map((item: any) => {
        if (item.isUsed) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: true,
            todoList: [...item.todoList, argTodoList]
          }
        }
        return item
      })
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    },
    removeList(argTodoList: any) {
      this.categoryList = this.categoryList.map((item: any) => {
        if (item.isUsed === true) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: item.isUsed,
            todoList: item.todoList.filter((item: any) => {
              return item.id !== argTodoList.id
            })
          }
        }
        return item
      })
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    },
    changeIsChecked(argTodoList: any) {
      this.categoryList = this.categoryList.map((item: any) => {
        if (item.isUsed === true) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: item.isUsed,
            todoList: item.todoList.map((item: any) => {
              if (item.id === argTodoList.id) {
                return {
                  id: item.id,
                  isChecked: !item.isChecked,
                  list: item.list
                }
              } else return item
            })
          }
        }
        return item
      })
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    }
  }
})
