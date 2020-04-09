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

export const actions = {
  moveTaskOrColumn({ dispatch }, dragData) {
    const move = {
      task: () => dispatch('moveTask', dragData),
      column: () => dispatch('moveColumn', dragData),
    }

    move[dragData.type]()
  },
  moveTask({ state, commit }, { fromColumn, toColumn, toTask, from }) {
    const fromTasks = state.board.columns[fromColumn].tasks
    const toTasks = state.board.columns[toColumn].tasks

    commit('MOVE_TASK', {
      fromTasks,
      toTasks,
      from,
      toTask: toTask ?? toTasks.length,
    })
  },
  moveColumn({ commit }, { from, toColumn }) {
    commit('MOVE_COLUMN', { from, toColumn })
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
  MOVE_TASK(state, { fromTasks, toTasks, from, toTask }) {
    const taskToMove = fromTasks.splice(from, 1)[0]
    toTasks.splice(toTask, 0, taskToMove)
  },
  MOVE_COLUMN(state, { from, toColumn }) {
    const columnList = state.board.columns
    const columnToMove = columnList.splice(from, 1)[0]
    columnList.splice(toColumn, 0, columnToMove)
  },
}
