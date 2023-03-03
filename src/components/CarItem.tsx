import { FC } from 'react'
import { ICar } from '../types/types'
import { Descriptions } from 'antd';
import s from './../styles/CarItem.module.css'

interface CarItemProps {
    car: ICar | null;
}

const CarItem:FC<CarItemProps> = ({car}) => {
    return (
        <Descriptions labelStyle={{width:'25%', fontWeight:'500'}} column={1} bordered className={s.wrapper} title={<div className={s.name}>{car?.brand}</div>}>
            <Descriptions.Item label='Цвет'>{car?.color}</Descriptions.Item>
            <Descriptions.Item label='Год выпуска'>{car?.year}</Descriptions.Item>
            <Descriptions.Item label='Гос. рег. номер'>{car?.registrationNumber}</Descriptions.Item>
        </Descriptions>
    )
}

export default CarItem