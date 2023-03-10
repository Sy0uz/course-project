import { Button, Typography } from 'antd'
import { FC, useEffect, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { InsertClientAC } from '../../store/reducers/mainReducer'
import s from './../../styles/RegNewClient.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import {  ChangeRegAddressValidAC, ChangeRegFullnameValidAC, ChangeRegLicenceValidAC, ChangeRegPassportValidAC, ClearRegClientAC } from '../../store/reducers/regClientReducer'
import { IClient } from '../../types/types'
import { IsLicence } from '../../utils/regexpLicence'
import { IsPassport } from '../../utils/regexpPassport'
import RegForm from './RegForm'
import { IsLetters } from '../../utils/regexpLetters'
import ModalError from '../ModalError'

const RegNewClient:FC = () => {

    const dispatch = useDispatch();

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const {addedKeys} = useTypedSelector(state => state.main);

    const {driverLicenceNumber, fullName, passportData, address} = useTypedSelector(state => state.regClient);

    const handler = ():void => {
        const newClient:IClient = {
            driverLicenceNumber: driverLicenceNumber.value,
            fullName: fullName.value,
            passportData: passportData.value,
            address: address.value,
        }
        if (addedKeys.includes(newClient.driverLicenceNumber)) {
            setModalOpen(true);
            return;
        }

        dispatch(InsertClientAC(newClient));
        dispatch(ClearRegClientAC());            
    }

    const checkValid = ():void => {
        IsLetters(fullName.value) && fullName.value.length > 3
                              ? dispatch(ChangeRegFullnameValidAC(true))
                              : dispatch(ChangeRegFullnameValidAC(false))

        IsPassport(passportData.value)
                              ? dispatch(ChangeRegPassportValidAC(true))
                              : dispatch(ChangeRegPassportValidAC(false))

        address.value.length > 5
                              ? dispatch(ChangeRegAddressValidAC(true))
                              : dispatch(ChangeRegAddressValidAC(false))
            
        IsLicence(driverLicenceNumber.value)
                              ? dispatch(ChangeRegLicenceValidAC(true))
                              : dispatch(ChangeRegLicenceValidAC(false))
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

            <ModalError open={modalOpen} onOk={() => {setModalOpen(false)}} body='Клиент с данным номером существует!'/>
        </div>
    )
}

export default RegNewClient