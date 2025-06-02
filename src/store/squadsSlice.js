import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  // Squadを格納する配列
  list: [],
  // 次に生成されるSquadのIDを管理するためのカウンター
  nextSquadId: 1,
}

export const squadsSlice = createSlice({
  name: 'squads',
  initialState,
  reducers: {
    // Squadを編成するアクション
    addSquad: (state, action) => {
      const { memberIds, name } = action.payload
      if (!memberIds || memberIds.length === 0) {
        console.warn('Attemted to create a squad with no members.')
        return state // メンバーがいないSquadは作成しない
      }
      const newSquad = {
        id: `squad-${state.nextSquadId.toString().padStart(3, '0')}`,
        name: name || `Squad-${state.nextSquadId}`,
        members: memberIds, // メンバーのクローンIDの配列
        status: 'idle', // 編成直後は待機状態
        // 能力値の初期値（算出ロジックは後で実装）
        capabilities: {
          mobility: 0,
          capacity: 0,
          perception: 0,
        },
      }
      state.list.push(newSquad)
      state.nextSquadId++
    },
    // Squadのメンバーを更新するアクション（メンバー追加、削除）
    // payload: { squadId: 'squad-001', newMemberIds: ['clone-001', 'clone-003']}
    updateSquadMembers: (state, action) => {
      const { squadId, status } = action.payload
      const existingSquad = state.list.find((squad) => squad.id === squadId)
      if (existingSquad) {
        existingSquad.members = newMemberIds
      }
    },
  },
  // Squadのステータスを更新するアクション（探索中、待機中など）
  // payload: { squadId: 'squad-001', status: 'exploring'}
  updateSquadStatus: (state, action) => {
    const { squadId, status } = action.payload
    const existingSquad = state.list.find((squad) => squad.id === squadId)
    if (existingSquad) {
      existingSquad.status = status
    }
  },
  // Squadを解散するアクション
  // payload: { squadId: 'squad-001' }
  disbandSquad: (state, action) => {
    const { squadId } = action.payload
    state.list = state.list.filter((squad) => squad.id !== squadId)
    // 解散されたSquadのメンバークローンのstatusもidle等に変更する必要がある
  },
  // Squadの能力値を更新するアクション（メンバー変更時などに使用
  // payload: { squadId: 'squad-001', capabilities: { mobility: 10, capacity: 5 }}
  updateSquadCapabilities: (state, action) => {
    const { squadId, capabilities } = action.payload
    const existingSquad = state.list.find((squad) => squad.id === squadId)
    if (existingSquad) {
      existingSquad.capabilities = {
        ...existingSquad.capabilities,
        ...capabilities,
      }
    }
  },
})

// アクションクリエーターをエクスポート
export const {
  addSquad,
  updateSquadMembers,
  updateSquadStatus,
  disbandSquad,
  updateSquadCapabilities,
} = squadsSlice.actions

// セレクターをエクスポート
export const selectSquads = (state) => state.squads.list
export const selectNextCloneId = (state) => state.squads.nextSquadId

export default squadsSlice.reducer
