import { FC, useMemo } from 'react'
import { Typography, Button, Divider } from 'antd';
import CarList from '../components/CarList';
import s from './../styles/CarPage.module.css'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { ChangeCarQueryAC, ClearHashAC } from '../store/reducers/carsReducer';
import Wrapper from '../UI/Wrapper/Wrapper';
import { ClearRentListAC } from '../store/reducers/rentReducer';

const CarsPage:FC = () => {

    const dispatch = useDispatch();

    const {HashCars, CarsQuery} = useTypedSelector(state => state.cars);

    const handler = () => {
        dispatch(ClearHashAC());
        dispatch(ClearRentListAC());
    }

    const list = useMemo(() => {
        if (!HashCars) return [];
        if (!CarsQuery) return HashCars.GetArray();

        return HashCars.FindList(CarsQuery);
    }, [CarsQuery, HashCars, HashCars?.segments])

    return (
        <Wrapper className='h100'>
            <div className={s.header}>
                <Typography.Title level={2}>Автомобили</Typography.Title>
                <Button danger onClick={handler}>Удалить данные</Button>
            </div>

            <Divider className={s.divider} />
            <CarList value={CarsQuery} onChange={(str) => dispatch(ChangeCarQueryAC(str))} list={list} />
        </Wrapper>

    )
}

export default CarsPage