import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Data from './Data'

const AllRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/user" element={<Data/>}/>
      </Routes>
    </div>
  )
}

export default AllRouter
