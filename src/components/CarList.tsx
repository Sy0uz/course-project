import { ChangeEvent, FC } from 'react'
import { ICar } from '../types/types'
import { Input } from 'antd';
import CarItem from './CarItem';

interface CarListProps {
    list: Array<ICar | null>,
    value: string,
    onChange: (str: string) => void;
}

const CarList:FC<CarListProps> = ({list, value, onChange}) => {

    const handler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div>
            <Input value={value} onChange={handler} placeholder='Найти автомобиль...'/>
            <div>
                {list.map(i => <CarItem key={i?.registrationNumber} car={i} />)}
            </div>
        </div>
    )
}

export default CarList