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
    <div id="app-container">
      <h1 className="app-title">Crawling Clones</h1>

      <Monitor />
      <Console />

      <GameLoop />
    </div>
  )
}

export default App
