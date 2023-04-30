import { defineStore } from 'pinia'

// types
type CategoryType = {
  categoryName: string
  id: number
  isUsed: boolean
  todoList: TodoListType[]
}

type TodoListType = {
  id: number
  isChecked: boolean
  list: string
}

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    name: 'Human',
    categoryList: [
      {
        id: 1,
        categoryName: 'Home',
        isUsed: true,
        todoList: [] as TodoListType[]
      }
    ]
  }),
  actions: {
    addName(argName: string): void {
      this.name = argName
      localStorage.setItem('todo-name', JSON.stringify(this.name))
    },
    allCategory(argTodo: []): void {
      this.categoryList = argTodo
    },
    addCategory(argCategory: CategoryType): void {
      this.categoryList = [...this.categoryList, argCategory]
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    },
    removeCategory(argId: number): void {
      this.categoryList = this.categoryList.filter((item) => {
        if (argId !== item.id) {
          return item
        }
      })
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    },
    changeIsUsed(argCategory: CategoryType): void {
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
    addList(argTodoList: TodoListType): void {
      this.categoryList = this.categoryList.map((item: CategoryType) => {
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
    removeList(argTodoList: TodoListType): void {
      this.categoryList = this.categoryList.map((item: CategoryType) => {
        if (item.isUsed === true) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: item.isUsed,
            todoList: item.todoList.filter((item: TodoListType) => {
              return item.id !== argTodoList.id
            })
          }
        }
        return item
      })
      localStorage.setItem('todo-data', JSON.stringify(this.categoryList))
    },
    changeIsChecked(argTodoList: TodoListType): void {
      this.categoryList = this.categoryList.map((item: CategoryType) => {
        if (item.isUsed === true) {
          return {
            id: item.id,
            categoryName: item.categoryName,
            isUsed: item.isUsed,
            todoList: item.todoList.map((item: TodoListType) => {
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
