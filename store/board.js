import { saveStatePlugin } from '../utils'
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
