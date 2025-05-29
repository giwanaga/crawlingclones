import { configureStore } from '@reduxjs/toolkit'
import resourcesReducer from './resourcesSlice'

const initialGameState = {}
function gameReducer(state = initialGameState, action) {
  return state
}

export const store = configureStore({
  reducer: {
    game: gameReducer,
    resources: resourcesReducer,
  },
})
