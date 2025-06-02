import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectClones, assignCloneToSquad } from '../store/clonesSlice'
import { addSquad, selectSquads } from '../store/squadsSlice'

function SquadsBoard() {
  const dispatch = useDispatch()
  const allClones = useSelector(selectClones)
  const squads = useSelector(selectSquads)

  // 現在選択中のクローンIDを保持するローカルステート
  const [selectedCloneIds, setSelectedCloneIds] = useState([])
  // 新しいSquadの名前を保持するローカルステート
  const [newSquadName, setNewSquadName] = useState()

  // どのSquadにも所属していないクローンをフィルタリング
  const availableClones = allClones.filter((clone) => clone.squadId === null)

  // 選択可能なクローンかどうかの判定
  const isCloneSelectable = (cloneId) => {
    return (
      !selectedCloneIds.includes(cloneId) &&
      availableClones.some((clone) => clone.id === cloneId)
    )
  }

  const handleCloneSelection = (cloneId) => {
    // 既に選択済なら選択解除、そうでなければ追加
    if (selectedCloneIds.includes(cloneId)) {
      setSelectedCloneIds((prevIds) => prevIds.filter((id) => id !== cloneId))
    } else {
      setSelectedCloneIds((prevIds) => [...prevIds, cloneId])
    }
  }

  const handleCreateSquad = () => {
    if (selectedCloneIds.length === 0) {
      alert('Please select at least one clone to form a squad.')
      return
    }

    // Squad名を自動生成する場合のロジック
    const squadName =
      newSquadName.trim() === '' ? `Squad-${squads.length + 1}` : newSquadName

    // 生成予定のSquadのIDを事前生成
    const newSquadId = `squad-${(squads.length + 1).toString().padStart(3, '0')}`

    // SquadをReduxストアに追加
    dispatch(
      addSquad({
        memberIds: selectedCloneIds,
        name: squadName,
        id: newSquadId,
      }),
    )

    // Squadに割り当てられたクローンのステータスを更新
    selectedCloneIds.forEach((cloneId) => {
      dispatch(assignCloneToSquad({ cloneId: cloneId, squadId: newSquadId }))
    })

    // 選択をクリアし、入力フィールドをリセット
    setSelectedCloneIds([])
    setNewSquadName('')
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <h4>Crawling Squads</h4>

      {/* Squad編成アクション */}
      <div
        style={{
          border: '1px solid #555',
          padding: '10px',
          marginBottom: '15px',
        }}
      >
        <h5>Form New Squad</h5>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="squadNameInput">Squad Name:</label>
          <input
            id="squadNameInput"
            type="text"
            value={newSquadName}
            onChange={(e) => setNewSquadName(e.target.value)}
            placeholder="e.g., Alpha Squad"
            style={{
              marginLeft: '5px',
              padding: '5px',
              backgroundColor: '#333',
              color: '#00ff00',
              border: '1px solid #777',
            }}
          />
        </div>

        {/* 待機中のクローン一覧 */}
        <h6>Available Clones ({availableClones.length})</h6>
        {availableClones.length === 0 ? (
          <p>No clones available for squad formation. Generate more clones.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1r))',
              gap: '8px',
              marginBottom: '10px',
            }}
          >
            {availableClones.map((clone) => (
              <button
                key={clone.id}
                onClick={() => handleCloneSelection(clone.id)}
                style={{
                  paddig: '5px',
                  border: selectedCloneIds.includes(clone.id)
                    ? '2px solid yellow'
                    : '1px solid #777;',
                  backgroundColor: selectedCloneIds.includes(clone.id)
                    ? '#004d00'
                    : '#222',
                  color: 'white',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '0.8em',
                  textAlign: 'left',
                }}
              >
                ID: {clone.id}
                <br />
                Name: {clone.name}
                <br />
                Status: {clone.status}
                {clone.squadId && (
                  <>
                    <br />
                    (Squad: {clone.squadId})
                  </>
                )}
              </button>
            ))}
          </div>
        )}

        {/* 選択中のクローン表示 */}
        <h6>Selected Clones ({selectedCloneIds.length})</h6>
        <div style={{ marginBottom: '10px', fontSize: '0.9em' }}>
          {selectedCloneIds.length === 0 ? (
            <p>No clones selected.</p>
          ) : (
            selectedCloneIds.map((id) => (
              <span
                key={id}
                style={{
                  display: 'inline-block',
                  backgroundColor: '#006400',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  marginRight: '5px',
                  marginBottom: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => handleCloneSelection(id)}
              >
                {allClones.find((c) => c.id === id)?.name || id} [x]
              </span>
            ))
          )}
        </div>

        <button
          onClick={handleCreateSquad}
          disabled={selectedCloneIds.length === 0} // メンバーが選択されていなければ無効
          style={{
            padding: '8px 15px',
            backgroundColor:
              selectedCloneIds.length > 0 ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedCloneIds.length > 0 ? 'pointer' : 'not-allowed',
          }}
        >
          Form Squad ({selectedCloneIds.length} Clones)
        </button>
      </div>

      {/* 編成済Squad一覧セクション */}
      <h5>Your Squads ({squads.length})</h5>
      {squads.length === 0 ? (
        <p>No squads formed yet.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '1px',
          }}
        >
          {squads.map((squad) => (
            <div
              key={squad.id}
              style={{
                border: '1px solid #777',
                padding: '8px',
                borderRadius: '5px',
              }}
            >
              <p>ID: {squad.id}</p>
              <p>Name: {squad.name}</p>
              <p>Status: {squad.status}</p>
              <p>Members: {squad.members.length} clone(s)</p>
              <p style={{ fontSize: '0.8em', color: '#aaa' }}>
                (
                {squad.members
                  .map(
                    (memberId) =>
                      allClones.find((c) => c.id === memberId)?.name ||
                      memberId,
                  )
                  .join(', ')}
                )
              </p>
              {/* Capabilitiesの表示 */}
              <p>Capabilities:</p>
              <ul
                style={{ margin: '0', paddingLeft: '20px', fontSize: '0.9em' }}
              >
                <li>Mobility: {squad.capabilities.mobility}</li>
                <li>Capacity: {squad.capabilities.capacity}</li>
                <li>Perception: {squad.capabilities.perception}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SquadsBoard
