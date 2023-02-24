import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import Navbar from './UI/Navbar/Navbar';
import Wrapper from './UI/Wrapper/Wrapper';
import { CreateTreeAC } from './store/reducers/mainReducer';

const App:FC = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(CreateTreeAC());
    }, [])

    return (
        <div className='App'>
            <Navbar/>
            <Wrapper>
                <AppRouter/>
            </Wrapper>
        </div>
    )
}

export default App