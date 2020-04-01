export const uuid = () =>
  Math.random()
    .toString(16)
    .slice(2)

export const saveStatePlugin = (store) =>
  store.subscribe((mutation, state) => {
    if (mutation.type !== 'board/GET_USER_BOARD')
      localStorage.setItem('board', JSON.stringify(state.board))
  })
