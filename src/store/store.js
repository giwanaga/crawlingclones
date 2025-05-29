import { configureStore } from '@reduxjs/toolkit'

const initialGameState = {}
function gameReducer(state = initialGameState, action) {
  return state
}

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
})
