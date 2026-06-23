import { useState } from 'react'
import Home from './pages/Home'
import DeletedGoals from './pages/DeletedGoals'
import { Routes, Route } from 'react-router-dom'
import { GoalsProvider } from './context/GoalsContext'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <div className="app-container">
        <GoalsProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deleted" element={<DeletedGoals />} />
        </Routes>
        </GoalsProvider>
        <ToastContainer
        closeOnClick={true} 
        autoClose={1000}
        pauseOnHover={false}
        hideProgressBar={true}
        />
      </div>
    </>
  )
}

export default App
