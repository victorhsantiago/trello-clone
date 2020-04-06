import { uuid } from '../utils'
import defaultBoard from '@/defaultBoard'

export const state = () => ({
  board: defaultBoard,
})

export const getters = {
  getTask: (state) => (id) => {
    for (const column of state.board.columns) {
      for (const task of column.tasks) {
        if (task.id === id) return task
      }
    }
  },
}

export const mutations = {
  GET_USER_BOARD(state) {
    if (localStorage.getItem('board')) {
      const { board } = JSON.parse(localStorage.getItem('board'))
      state.board = board
    }
  },
  CREATE_TASK(state, { tasks, name }) {
    tasks.push({
      name,
      id: uuid(),
      description: '',
    })
  },
  CREATE_COLUMN(state, { name }) {
    state.board.columns.push({ name, tasks: [] })
  },
  UPDATE_TASK(state, { task, key, value }) {
    task[key] = value
  },
  MOVE_TASK(state, { fromTasks, toTasks, fromTaskIndex, toTaskIndex }) {
    const taskToMove = fromTasks.splice(fromTaskIndex, 1)[0]
    toTasks.splice(toTaskIndex, 0, taskToMove)
  },
  MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
    const columnList = state.board.columns
    const columnToMove = columnList.splice(fromColumnIndex, 1)[0]
    columnList.splice(toColumnIndex, 0, columnToMove)
  },
}
