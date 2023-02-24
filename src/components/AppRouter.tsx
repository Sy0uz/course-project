import {FC} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ClientsPage from '../pages/ClientsPage'
import HomePage from '../pages/HomePage'

const AppRouter:FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/cars' element={<div>cars</div>}/>
            <Route path='/clients' element={<ClientsPage/>}/>
            <Route path='/error' element={<div>Error</div>}/>
            <Route path='/*' element={<Navigate to={'/error'} replace/>}/>
        </Routes>
    )
}

export default AppRouter