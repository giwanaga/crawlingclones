import React, { useState } from 'react'
import ClonesBoard from './ClonesBoard'
import SquadsBoard from './SquadsBoard'

function Console() {
  const [activeMenu, setActiveMenu] = useState('clones')

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        border: '1px solid green',
        boxSizing: 'border-box',
      }}
    >
      {/* Console.Menu (左側) */}
      <div
        style={{
          width: '150px',
          borderRight: '1px solid lightgray',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h4>Menu</h4>
        <div style={{ flexGrow: 1 }}>
          <button
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '5px',
              padding: '8px',
              backgroundColor: activeMenu === 'clones' ? '#007bff' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
            onClick={() => setActiveMenu('clones')}
          >
            Clones
          </button>
          <button
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '5px',
              padding: '8px',
              backgroundColor: activeMenu === 'clones' ? '#007bff' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              boxSizing: 'border-box',
            }}
            onClick={() => setActiveMenu('squads')}
          >
            Squads
          </button>
          <button
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '5px',
              padding: '8px',
              backgroundColor: activeMenu === 'originals' ? '#007bff' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'not-allowed',
              boxSizing: 'border-box',
            }}
            onClick={() => setActiveMenu('originals')}
            disabled
          >
            Originals
          </button>
          <button
            style={{
              display: 'block',
              width: '100%',
              marginBottom: '5px',
              padding: '8px',
              backgroundColor: activeMenu === 'genes' ? '#007bff' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'not-allowed',
              boxSizing: 'border-box',
            }}
            onClick={() => setActiveMenu('genes')}
            disabled
          >
            Genes
          </button>
        </div>
      </div>

      {/* Console.Board (右側) */}
      <div style={{ flex: 1, padding: '10px' }}>
        {activeMenu === 'clones' && <ClonesBoard />}
        {activeMenu === 'squads' && <SquadsBoard />}
        {activeMenu === 'originals' && (
          <div style={{ flex: 1 }}>
            <h4>Originals Management</h4>
            <p>Coming soon...</p>
          </div>
        )}
        {activeMenu === 'genes' && (
          <div style={{ flex: 1 }}>
            <h4>Genes Management</h4>
            <p>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Console
