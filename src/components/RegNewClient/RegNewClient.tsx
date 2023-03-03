import { Button, Typography } from 'antd'
import { FC, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { InsertClientAC } from '../../store/reducers/mainReducer'
import s from './../../styles/RegNewClient.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {  ChangeRegAddressValidAC, ChangeRegFullnameValidAC, ChangeRegLicenceValidAC, ChangeRegPassportValidAC, ClearRegClientAC } from '../../store/reducers/regClientReducer'
import { IClient } from '../../types/types'
import { IsLicence } from '../../utils/regexpLicence'
import { IsPassport } from '../../utils/regexpPassport'
import RegForm from './RegForm'

const RegNewClient:FC = () => {

    const dispatch = useDispatch();

    const {addedKeys} = useTypedSelector(state => state.main);

    const {driverLicenceNumber, fullName, passportData, address} = useTypedSelector(state => state.regClient);

    const handler = ():void => {
        const newClient:IClient = {
            driverLicenceNumber: driverLicenceNumber.value,
            fullName: fullName.value,
            passportData: passportData.value,
            address: address.value,
        }
        if (!addedKeys.includes(newClient.driverLicenceNumber))
            dispatch(InsertClientAC(newClient));
        dispatch(ClearRegClientAC());            
    }

    const checkValid = ():void => {
        if (fullName.value.length > 5)
            dispatch(ChangeRegFullnameValidAC(true));
        else
            dispatch(ChangeRegFullnameValidAC(false));

        if (IsPassport(passportData.value))
            dispatch(ChangeRegPassportValidAC(true));
        else
            dispatch(ChangeRegPassportValidAC(false));

        if (address.value.length > 5)
            dispatch(ChangeRegAddressValidAC(true));
        else
            dispatch(ChangeRegAddressValidAC(false))

        if (IsLicence(driverLicenceNumber.value))
            dispatch(ChangeRegLicenceValidAC(true))
        else {
            dispatch(ChangeRegLicenceValidAC(false))
        }
    }

    const valid = useMemo(() => {
        return driverLicenceNumber.valid && fullName.valid && passportData.valid && address.valid
    }, [driverLicenceNumber.valid, fullName.valid, passportData.valid, address.valid])

    useEffect(() => {
        checkValid();
    }, [driverLicenceNumber.value, fullName.value, passportData.value, address.value])

    return (
        <div className={s.wrapper}>
            <Typography.Title level={3}>Регистрация нового клиента</Typography.Title>

            <RegForm/>

            <div className={s.btnBox}>
                <Button onClick={handler} type='primary' disabled={!valid}>Зарегистрировать</Button>
            </div>
        </div>
    )
}

export default RegNewClient