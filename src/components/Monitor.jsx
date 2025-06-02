import React, { useState } from 'react'
import ResourcesModule from './ResourcesModule'
import styles from './Monitor.module.css'

function Monitor() {
  const [activeModule, setActiveModule] = useState('resources')

  return (
    <div className={styles.monitorContainer}>
      <div className={styles.tabBar}>
        <button
          className={`${styles.tabButton} ${activeModule === 'resources' ? styles.tabButtonActive : styles.tabButtonInactive}`}
          onClick={() => setActiveModule('resources')}
        >
          Resources
        </button>
        <button
          className={`${styles.tabButton} ${activeModule === 'feed' ? styles.tabButtonActive : styles.tabButtonInactive}`}
          onClick={() => setActiveModule('feed')}
        >
          Feed
        </button>
      </div>

      {/* Display Active Module */}
      <div style={{ flex: 1, display: 'flex' }}>
        {activeModule === 'resources' && <ResourcesModule />}
        {activeModule === 'feed' && (
          <div className={styles.feedModuleContent}>
            <h3>Feed</h3>
            <p>ここにシステムメッセージやプレビューが表示されます</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Monitor
