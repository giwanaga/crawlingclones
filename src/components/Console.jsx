import React, { useState } from 'react'
import ClonesBoard from './ClonesBoard'
import SquadsBoard from './SquadsBoard'
import styles from './Console.module.css'

function Console() {
  const [activeMenu, setActiveMenu] = useState('clones')

  return (
    <div className={styles.consoleContainer}>
      {/* Console.Menu (左側) */}
      <div className={styles.menuArea}>
        <h4>Menu</h4>
        <div style={{ flexGrow: 1 }}>
          <button
            className={`${styles.menuButton} ${activeMenu === 'clones' ? styles.menuButtonActive : styles.menuButtonInactive}`}
            onClick={() => setActiveMenu('clones')}
          >
            Clones
          </button>
          <button
            className={`${styles.menuButton} ${activeMenu === 'squads' ? styles.menuButtonActive : styles.menuButtonInactive}`}
            onClick={() => setActiveMenu('squads')}
          >
            Squads
          </button>
          <button
            className={`${styles.menuButton} ${activeMenu === 'originals' ? styles.menuButtonActive : styles.menuButtonInactive}`}
            onClick={() => setActiveMenu('originals')}
            disabled
          >
            Originals
          </button>
          <button
            className={`${styles.menuButton} ${activeMenu === 'genes' ? styles.menuButtonActive : styles.menuButtonInactive}`}
            onClick={() => setActiveMenu('genes')}
            disabled
          >
            Genes
          </button>
        </div>
      </div>

      {/* Console.Board (右側) */}
      <div className={styles.boardArea}>
        {activeMenu === 'clones' && (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <ClonesBoard />
          </div>
        )}
        {activeMenu === 'squads' && (
          <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <SquadsBoard />
          </div>
        )}
        {activeMenu === 'originals' && (
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <h4>Originals Management</h4>
            <p>Coming soon...</p>
          </div>
        )}
        {activeMenu === 'genes' && (
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              overflowY: 'auto',
            }}
          >
            <h4>Genes Management</h4>
            <p>Coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Console
