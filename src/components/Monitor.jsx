import React, { useState } from 'react'
import ResourcesModule from './ResourcesModule'

function Monitor() {
  const [activeModule, setActiveModule] = useState('resources')

  return (
    <div
      style={{
        flex: 1,
        border: '1px solid blue',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ padding: '5px', borderBottom: '1px solid lightgray' }}>
        <button
          style={{
            marginRight: '5px',
            backgroundColor:
              activeModule === 'resources' ? 'lightblue' : 'white',
            border: '1px solid gray',
            cursor: 'pointer',
          }}
          onClick={() => setActiveModule('resources')}
        >
          Resources
        </button>
        <button
          style={{
            marginRight: '5px',
            backgroundColor: activeModule === 'feed' ? 'lightblue' : 'white',
            border: '1px solid gray',
            cursor: 'pointer',
          }}
          onClick={() => setActiveModule('feed')}
        >
          Feed
        </button>
      </div>

      {/* Display Active Module */}
      <div style={{ flex: 1, display: 'flex' }}>
        {activeModule === 'resources' && <ResourcesModule />}
        {activeModule === 'feed' && (
          <div style={{ padding: '10px' }}>
            <h3>Feed</h3>
            <p>ここにシステムメッセージやプレビューが表示されます</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Monitor
