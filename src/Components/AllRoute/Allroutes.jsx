import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from '../Home'
import ViewDetails from '../ViewDetails'

function Allroutes() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/docData/:id' element={<ViewDetails />} />
        </Routes>
    )
}

export default Allroutes