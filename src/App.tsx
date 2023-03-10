import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import Navbar from './UI/Navbar/Navbar';
import { CreateTreeAC } from './store/reducers/mainReducer';
import { CreateHashAC } from './store/reducers/carsReducer';
import { CreateListAC } from './store/reducers/rentReducer';

const App:FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CreateTreeAC());
        dispatch(CreateHashAC());
        dispatch(CreateListAC());
    }, [])

    return (
        <div className='App'>
            <Navbar/>
            <AppRouter/>
        </div>
    )
}

export default App