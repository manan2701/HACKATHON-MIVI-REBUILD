import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home.jsx'

const App = () => {
  return (
    <>
      <div className="data-scroll-container">
        <NavBar/>
        <Home/>
      </div>
    </>
  )
}

export default App