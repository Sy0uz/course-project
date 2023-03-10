import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import CarBody from '../components/CarBody';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { ChangeCarAvaliableAC, ChangeRentStatusAC, ClearFindedCarAC, DeleteCarAC, FindCarAC } from '../store/reducers/carsReducer';
import { AddRentDataAC, RemoveRentDataAC } from '../store/reducers/rentReducer';
import { IRent } from '../types/types';
import Wrapper from '../UI/Wrapper/Wrapper'

type SelfParams = {
    registrationNumber: string;
}

const SelfCarPage: FC = () => {
    const dispatch = useDispatch();
    const route = useNavigate();
    const params = useParams<SelfParams>();

    const {findedCar, isRented} = useTypedSelector(state => state.cars);
    const {LinkedList} = useTypedSelector(state => state.rent);
    const {ClientsTree} = useTypedSelector(state => state.main);

    const [owner, setOwner] = useState<IRent | null>(null);

    const deleteCar = (number:string):void => {
        if (isRented && params.registrationNumber)
            dispatch(RemoveRentDataAC(params.registrationNumber))
        dispatch(DeleteCarAC(number))
        route('/');
    }

    const sendRepair = ():void => {
        params.registrationNumber && dispatch(ChangeCarAvaliableAC(params.registrationNumber, false))
    }

    const returnFromRepair = ():void => {
        params.registrationNumber && dispatch(ChangeCarAvaliableAC(params.registrationNumber, true))
    }

    const rentCar = (rent:IRent):void => {
        dispatch(AddRentDataAC(rent));
        params.registrationNumber && dispatch(ChangeCarAvaliableAC(params.registrationNumber, false))
    }

    useEffect(() => {
        if (params.registrationNumber) {
            dispatch(FindCarAC(params.registrationNumber))
            if (LinkedList) {
                let rented = LinkedList.FindCarRent(params.registrationNumber)
                setOwner(rented ? rented : null);
                dispatch(ChangeRentStatusAC(rented ? true : false));
            }
        }
        return () => {
            dispatch(ClearFindedCarAC());
        }
    }, [params.registrationNumber, LinkedList?.count])

    return (
        <Wrapper>
            {
                findedCar
                ? <CarBody car={findedCar} deleteCar={deleteCar} rentCar={rentCar} sendRepair={sendRepair} returnFromRepair={returnFromRepair} arended={isRented} clientList={ClientsTree ? ClientsTree.treeLists : []} owner={owner}/>
                : <div></div>
            }
        </Wrapper>
    )
}

export default SelfCarPage