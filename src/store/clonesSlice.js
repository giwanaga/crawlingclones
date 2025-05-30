import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // クローンを格納する配列
  // 各クローンはユニークなIDを持つオブジェクトとする
  list: [],
  // 次に生成されるクローンのIDを管理するためのカウンター
  nextCloneId: 1,
}

export const clonesSlice = createSlice({
  name: 'clones', // このスライスの名前（Reduxストアのキーとなる）
  initialState,
  reducers: {
    addClone: (state, action) => {
      const { originalType, name } = action.payload
      const newClone = {
        id: `clone-${state.nextCloneId.toString().padStart(3, '0')}`,
        name: name || `${originalType}-Unit-${state.nextCloneId}`,
        originalType: originalType,
        status: 'idle',
        health: 100,
        traits: [],
        squadId: null,
      }
      state.list.push(newClone)
      state.nextCloneId++
    },
    updateCloneStatus: (state, action) => {
      const { id, status } = action.payload
      const existingClone = state.list.find((clone) => clone.id === id)
      if (existingClone) {
        existingClone.status = status
      }
    },
    decommissionClone: (state, action) => {
      const { id } = action.payload
      const existingClone = state.list.find((clone) => clone.id === id)
      if (existingClone) {
        existingClone.status = 'decommissioned'
      }
    },
    updateCloneHealth: (state, action) => {
      const { id, health } = action.payload
      const existingClone = state.list.find((clone) => clone.id === id)
      if (existingClone) {
        existingClone.health = Math.max(0, Math.min(100, health))
        if (existingClone.health === 0) {
          existingClone.status = 'decommissioned'
        }
      }
    },
    addCloneTrait: (state, action) => {
      const { id, trait } = action.payload
      const existingClone = state.list.find((clone) => clone.id === id)
      if (existingClone && !existingClone.traits.includes(trait)) {
        existingClone.traits.push(trait)
      }
    },
  },
})

// アクションクリエーターをエクスポート
export const {
  addClone,
  updateCloneStatus,
  decommissionClone,
  updateCloneHealth,
  addCloneTrait,
} = clonesSlice.actions

// セレクターをエクスポート}
export const selectClones = (state) => state.clones.list
export const selectNextCloneId = (state) => state.clones.nextCloneId

export default clonesSlice.reducer
