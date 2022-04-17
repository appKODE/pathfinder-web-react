import React from 'react'

import '@kode-frontend/pathfinder-web-react/dist/index.css'

import { PathfinderProvider } from './features/pathfinder'

const App = () => {
  return (
    <>
      <PathfinderProvider>
        <h1>Your application</h1>
      </PathfinderProvider>
    </>
  )
}

export default App
