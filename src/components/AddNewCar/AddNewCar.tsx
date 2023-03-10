import { Button, Typography } from 'antd'
import { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ChangeAddBrandValidAC, ChangeAddColorValidAC, ChangeAddNumberValidAC, ChangeAddYearValidAC, ClearAddCarAC } from '../../store/reducers/addCarReducer'
import { InsertCarAC } from '../../store/reducers/carsReducer'
import { ICar } from '../../types/types'
import { IsRegNumber } from '../../utils/regexpCarNumber'
import { IsLetters } from '../../utils/regexpLetters'
import { IsYear } from '../../utils/regexpYear'
import ModalError from '../ModalError'
import s from './../../styles/AddNewCar.module.css'
import AddCarForm from './AddCarForm'

const AddNewCar:FC = () => {

    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const { addedCars } = useTypedSelector(state => state.cars)

    const { registrationNumber, brand, color, year } = useTypedSelector(state => state.addCar)

    const valid = useMemo(() => {
        return registrationNumber.valid && brand.valid && color.valid && year.valid;
    }, [registrationNumber.valid, brand.valid, color.valid, year.valid])

    const checkValid = ():void => {
        brand.value.length > 3 
                            ? dispatch(ChangeAddBrandValidAC(true))                     
                            : dispatch(ChangeAddBrandValidAC(false))

        IsLetters(color.value) && color.value.length > 3
                            ? dispatch(ChangeAddColorValidAC(true))
                            : dispatch(ChangeAddColorValidAC(false))
        
        IsYear(year.value)
                            ? dispatch(ChangeAddYearValidAC(true))
                            : dispatch(ChangeAddYearValidAC(false))
        
        IsRegNumber(registrationNumber.value) 
                            ? dispatch(ChangeAddNumberValidAC(true))
                            : dispatch(ChangeAddNumberValidAC(false))
    }

    useEffect(() => {
        checkValid();
    }, [brand.value, color.value, year.value, registrationNumber.value])

    const handler = ():void => {
        const car:ICar = {
            registrationNumber: registrationNumber.value,
            brand: brand.value,
            color: color.value,
            year: Number(year.value),
            isAvailable: true,
        }

        if (addedCars.includes(car.registrationNumber)) {
            setModalOpen(true)
            return;
        }
        dispatch(InsertCarAC(car));
        dispatch(ClearAddCarAC());
    }

    return (
        <div className={s.wrapper}>
            <Typography.Title level={3}>Добавление нового автомобиля</Typography.Title>

            <AddCarForm/>

            <div className={s.btnBox}>
                <Button onClick={handler} type='primary' disabled={!valid}>Добавить</Button>
            </div>

            <ModalError open={modalOpen} onOk={() => setModalOpen(false)} body='Автомобиль с таким номером существует!'/>
        </div>
    )
}

export default AddNewCar