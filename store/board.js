import { saveStatePlugin, uuid } from '../utils'
import defaultBoard from '@/defaultBoard'

const board = process.browser
  ? JSON.parse(localStorage.getItem('board')) || defaultBoard
  : defaultBoard

export const plugins = [saveStatePlugin]

export const state = () => ({
  board,
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
  CREATE_TASK(state, { tasks, name }) {
    tasks.push({
      name,
      id: uuid(),
      description: '',
    })
  },
  UPDATE_TASK(state, { task, key, value }) {
    task[key] = value
  },
}
