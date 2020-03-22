import defaultBoard from '@/defaultBoard'

const board = process.browser
  ? JSON.parse(localStorage.getItem('board')) || defaultBoard
  : defaultBoard

export const state = () => ({
  board,
})
