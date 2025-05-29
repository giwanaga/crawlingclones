import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Monitor from './components/Monitor'
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
      }}
    >
      <h1 style={{ textAlign: 'center', margin: '10px', color: '#00cc00' }}>
        Crawling Clones
      </h1>

      <Monitor />

      <div
        style={{
          flex: 1,
          border: '1px, solid, red',
          margin: '10px',
          padding: '10px',
        }}
      >
        <h3>Console Area (Coming Soon)</h3>
      </div>
    </div>
  )
}

export default App
