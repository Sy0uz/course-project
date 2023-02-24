import { Button, Input, Typography, Tooltip } from 'antd'
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons'
import { FC, useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { InsertClientAC } from '../store/reducers/mainReducer'
import s from './../styles/RegNewClient.module.css'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ChangeRegAddressAC, ChangeRegAddressValidAC, ChangeRegFullnameAC, ChangeRegFullnameValidAC, ChangeRegLicenceAC, ChangeRegLicenceValidAC, ChangeRegPassportAC, ChangeRegPassportValidAC, ClearRegClientAC } from '../store/reducers/regClientReducer'
import { IClient } from '../types/types'
import { IsLicence } from '../utils/regexpLicence'
import { IsPassport } from '../utils/regexpPassport'

const RegNewClient:FC = () => {

    const dispatch = useDispatch();

    const {driverLicenceNumber, fullName, passportData, address} = useTypedSelector(state => state.regClient);

    const handler = () => {
        const newClient:IClient = {
            driverLicenceNumber: driverLicenceNumber.value,
            fullName: fullName.value,
            passportData: passportData.value,
            address: address.value,
        }
        dispatch(InsertClientAC(newClient));
        dispatch(ClearRegClientAC());            
    }

    const valid = useMemo(() => {
        return driverLicenceNumber.valid && fullName.valid && passportData.valid && address.valid
    }, [driverLicenceNumber.valid, fullName.valid, passportData.valid, address.valid])

    useEffect(() => {
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
            
    }, [driverLicenceNumber.value, fullName.value, passportData.value, address.value])

    return (
        <div className={s.wrapper}>
            <Typography.Title level={3}>Регистрация нового клиента</Typography.Title>

            <div className={s.inputs}>
                <Input suffix={fullName.valid ? <CheckOutlined /> : null} value={fullName.value} onChange={(e) => {dispatch(ChangeRegFullnameAC(e.target.value))}} placeholder='Фамилия Имя Отчество...'/>
                <Input suffix={passportData.valid ? <CheckOutlined /> : null} value={passportData.value} onChange={(e) => {dispatch(ChangeRegPassportAC(e.target.value))}} placeholder='Паспортные данные...' maxLength={10} showCount/>
                <Input suffix={address.valid ? <CheckOutlined /> : null} value={address.value} onChange={(e) => {dispatch(ChangeRegAddressAC(e.target.value))}} placeholder='Адрес...' />
                <Input value={driverLicenceNumber.value} onChange={(e) => {dispatch(ChangeRegLicenceAC(e.target.value))}} placeholder='Номер водительского удостоверения...' showCount maxLength={12} suffix={
                    <Tooltip title={
                        <div className={s.list}>
                            <div>Номер водительского удостоверения – строка формата «RR AA NNNNNN»,</div>
                            <div>RR – код региона (цифры);</div>
                            <div>AA – серия (буквы из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х);</div>
                            <div>NNNNNN – порядковый номер удостоверения (цифры)</div>
                        </div>
                    }>
                        {
                            driverLicenceNumber.valid
                            ? <CheckOutlined/>
                            : <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                        }
                    </Tooltip>
                }/>
            </div>

            <div className={s.btnBox}>
                <Button onClick={handler} type='primary' className={s.btn} disabled={!valid}>Зарегистрировать</Button>
            </div>
        </div>
    )
}

export default RegNewClient