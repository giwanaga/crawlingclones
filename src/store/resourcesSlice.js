import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bioMass: {
    current: 5,
    perSecond: 0,
    limit: 100,
  },
  energy: {
    current: 10,
    perSecond: 10,
    limit: 100,
  },
  scrap: {
    current: 0,
    perSecond: 0,
    limit: 50,
  },
  original: {
    type: 'Alice',
  },
}

export const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setResource: (state, action) => {
      const { resource, amount } = action.payload
      if (state[resource]) {
        state[resource].current = Math.max(
          0,
          Math.min(amount, stte[resource].limit),
        )
      }
    },
    increaseResource: (state, action) => {
      const { resource, amount } = action.payload
      if (state[resource]) {
        state[resource].current = Math.min(
          state[resource].current + amount,
          state[resource].limit,
        )
      }
    },
    decreaseResource: (state, action) => {
      const { resource, amount } = action.payload
      if (state[resource]) {
        state[resource].current = Math.max(state[resource].current - amount, 0)
      }
    },
    setResourceLimit: (state, action) => {
      const { resource, limit } = action.payload
      if (state[resource]) {
        state[resource].limit = limit
        state[resource].current = Math.min(
          state[resource].current,
          state[resource].limit,
        )
      }
    },
    updateOriginalParams: (state, action) => {
      // e.g.) state.original.strength = action.payload.strength
    },
  },
})

export const {
  setResource,
  increaseResource,
  decreaseResource,
  setResourceLimit,
  updateOriginalParams,
} = resourcesSlice.actions

export const selectResources = (state) => state.resources
export const selectBioMass = (state) => state.resources.bioMass
export const selectEnergy = (state) => state.resources.energy
export const selectScrap = (state) => state.resources.scrap
export const selectOriginal = (state) => state.resources.original

export default resourcesSlice.reducer
