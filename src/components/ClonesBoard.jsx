import React, { use } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addClone, selectClones, selectNextCloneId } from '../store/clonesSlice'
import { selectBioMass, decreaseResource } from '../store/resourcesSlice'

// Clone生成に必要なBio-Mass量
const CLONE_COST_BIOMASS = 10

function ClonesBoard() {
  const dispatch = useDispatch()
  const clones = useSelector(selectClones)
  const nextCloneId = useSelector(selectNextCloneId)
  const bioMass = useSelector(selectBioMass)

  const canCreateClone = bioMass.current >= CLONE_COST_BIOMASS

  const handeCreateClone = () => {
    if (canCreateClone) {
      // Bio-Massを消費
      dispatch(
        decreaseResource({ resource: 'bioMass', amount: CLONE_COST_BIOMASS }),
      )
      // Cloneを生成
      dispatch(addClone({ originalType: 'Alice' })) // 仮でOriginal TypeをAliceに固定
    } else {
      alert(
        `Not enough Bio-Mass! Requires ${CLONE_COST_BIOMASS}. You have ${bioMass.current}.`,
      )
    }
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      <h4>Clones Management</h4>

      {/* クローン生成セクション */}
      <div
        style={{
          border: '1px solid #555',
          padding: '10px',
          marginBottom: '15px',
        }}
      >
        <h5>Generate New Clone</h5>
        <p>Cost: {CLONE_COST_BIOMASS} Bio-Mass</p>
        <button
          onClick={handeCreateClone}
          disabled={!canCreateClone}
          style={{
            padding: '8px 15px',
            backgroundColor: canCreateClone ? '#28a745' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: canCreateClone ? 'pointer' : 'not-allowed',
          }}
        >
          Generate Clone
        </button>
        {!canCreateClone && (
          <p style={{ color: 'red', fontSize: '0.8em' }}>
            Insufficient Bio-Mass
          </p>
        )}
      </div>

      {/* クローン一覧セクション */}
      <div style={{ border: '1px solid #555', padding: '10px' }}>
        <h5>Clones: ({clones.length})</h5>
        {clones.length === 0 ? (
          <p>No clones generated yet.</p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: '10px',
            }}
          >
            {clones.map((clone) => (
              <div
                key={clone.id}
                style={{
                  border: '1px solid #777',
                  padding: '8px',
                  borderRadis: '5px',
                }}
              >
                <p>ID: {clone.id}</p>
                <p>Name: {clone.name}</p>
                <p>Status: {clone.status}</p>
                <p>Health: {clone.health}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ClonesBoard
