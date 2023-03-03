import {FC} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import CarsPage from '../pages/CarsPage'
import ClientsPage from '../pages/ClientsPage'
import HomePage from '../pages/HomePage'
import SelfCarPage from '../pages/SelfCarPage'

const AppRouter:FC = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/cars' element={<CarsPage/>}/>
            <Route path='/cars/:registrationNumber' element={<SelfCarPage/>}/>
            <Route path='/clients' element={<ClientsPage/>}/>
            <Route path='/error' element={<div>Error</div>}/>
            <Route path='/*' element={<Navigate to={'/error'} replace/>}/>
        </Routes>
    )
}

export default AppRouter