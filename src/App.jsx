import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Monitor from './components/Monitor'
import Console from './components/Console'
import GameLoop from './components/GameLoop'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        fontFamily: 'monospace',
        backgroundColor: '#1a1a1a',
        color: '#00ff00',
        padding: '10px',
        boxSizing: 'border-box',
        gap: '10px',
      }}
    >
      <h1 style={{ textAlign: 'center', margin: '10px', color: '#00cc00' }}>
        Crawling Clones
      </h1>

      <Monitor />

      <Console />

      <GameLoop />
    </div>
  )
}

export default App
