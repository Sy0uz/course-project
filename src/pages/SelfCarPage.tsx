import { FC, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import CarBody from '../components/CarBody';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ClearFindedCarAC, DeleteCarAC, FindCarAC } from '../store/reducers/carsReducer';
import Wrapper from '../UI/Wrapper/Wrapper'

type SelfParams = {
    registrationNumber: string;
}

const SelfCarPage: FC = () => {
    const dispatch = useDispatch();
    const route = useNavigate();
    const params = useParams<SelfParams>();

    const {findedCar} = useTypedSelector(state => state.cars);

    const deleteCar = (number:string):void => {
        dispatch(DeleteCarAC(number))
        route('/');
    }

    useEffect(() => {
        if (params.registrationNumber)
            dispatch(FindCarAC(params.registrationNumber))

        return () => {
            dispatch(ClearFindedCarAC());
        }
    }, [params.registrationNumber])

    return (
        <Wrapper>
            {
                findedCar
                ? <CarBody car={findedCar} deleteCar={deleteCar}/>
                : <div></div>
            }
        </Wrapper>
    )
}

export default SelfCarPage