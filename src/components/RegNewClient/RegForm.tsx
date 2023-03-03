import { FC } from 'react'
import { Input, Tooltip } from 'antd'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons'
import s from './../../styles/RegNewClient.module.css'
import { ChangeRegAddressAC, ChangeRegFullnameAC, ChangeRegLicenceAC, ChangeRegPassportAC } from '../../store/reducers/regClientReducer'
import { useDispatch } from 'react-redux';

const RegForm:FC = () => {

    const {driverLicenceNumber, fullName, passportData, address} = useTypedSelector(state => state.regClient);
    const dispatch = useDispatch();

    return (
        <div className={s.inputs}>
            <Input suffix={fullName.valid ? <CheckOutlined/> : <></>} value={fullName.value} onChange={(e) => { dispatch(ChangeRegFullnameAC(e.target.value)) }} placeholder='Фамилия Имя Отчество...' />
            <Input suffix={passportData.valid ? <CheckOutlined /> : <></>} value={passportData.value} onChange={(e) => { dispatch(ChangeRegPassportAC(e.target.value)) }} placeholder='Паспортные данные...' maxLength={10} showCount />
            <Input suffix={address.valid ? <CheckOutlined/> : <></>} value={address.value} onChange={(e) => { dispatch(ChangeRegAddressAC(e.target.value)) }} placeholder='Адрес...' />
            <Input value={driverLicenceNumber.value} onChange={(e) => { dispatch(ChangeRegLicenceAC(e.target.value)) }} placeholder='Номер водительского удостоверения...' showCount maxLength={12} suffix={
                !driverLicenceNumber.valid
                ?
                <Tooltip title={
                    <div className={s.list}>
                        <div>Номер водительского удостоверения – строка формата «RR AA NNNNNN»,</div>
                        <div>RR – код региона (цифры);</div>
                        <div>AA – серия (буквы из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х);</div>
                        <div>NNNNNN – порядковый номер удостоверения (цифры)</div>
                    </div>
                }>
                    <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
                : <CheckOutlined/>
            } />
        </div>
    )
}

export default RegForm