import { ChangeEvent, FC } from 'react'
import { ICar } from '../types/types'
import { Input, Row, Typography } from 'antd';
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
                {
                    list.length
                    ? list.map(i => <CarItem key={i?.registrationNumber} car={i} />)
                    : <Row justify='center' style={{marginTop:'2rem'}}><Typography.Title level={3}>Список пуст!</Typography.Title></Row>
                }
            </div>
        </div>
    )
}

export default CarList