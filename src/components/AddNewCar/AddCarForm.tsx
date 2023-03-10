import { FC } from 'react'
import { Input, Tooltip } from 'antd'
import { CheckOutlined, InfoCircleOutlined } from '@ant-design/icons'
import s from './../../styles/AddNewCar.module.css'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ChangeAddBrandAC, ChangeAddColorAC, ChangeAddNumberAC, ChangeAddYearAC } from '../../store/reducers/addCarReducer'

const AddCarForm:FC = () => {

    const dispatch = useDispatch()

    const { registrationNumber, brand, color, year } = useTypedSelector(state => state.addCar)

    return (
        <div className={s.inputs}>
            <Input suffix={ brand.valid ? <CheckOutlined /> : <></>} value={brand.value} onChange={(e) => { dispatch(ChangeAddBrandAC(e.target.value)) }} placeholder='Марка...'/>
            <Input suffix={ color.valid ? <CheckOutlined /> : <></>} value={color.value} onChange={(e) => { dispatch(ChangeAddColorAC(e.target.value)) }} placeholder='Цвет...'/>
            <Input suffix={ year.valid ? <CheckOutlined /> : <></>} value={year.value} onChange={(e) => { dispatch(ChangeAddYearAC(e.target.value)) }} placeholder='Год выпуска...' />
            <Input placeholder='Государственный регистрационный номер...' value={registrationNumber.value} onChange={(e) => {dispatch(ChangeAddNumberAC(e.target.value))}} showCount maxLength={9} suffix={
                !registrationNumber.valid
                    ?
                    <Tooltip title={
                        <div className={s.list}>
                            <div>Государственный регистрационный номер – строка формата «ANNNAA-NN»</div>
                            <div>N –цифра</div>
                            <div>A – буква из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х</div>
                        </div>
                    }>
                        <InfoCircleOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
                    </Tooltip>
                    : <CheckOutlined />
            } />
        </div>
    )
}

export default AddCarForm