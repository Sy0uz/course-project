import { Button, Descriptions, Divider, Typography } from 'antd';
import {FC} from 'react'
import { ICar } from '../types/types'
import MyCarousel from '../UI/Carousel/MyCarousel';
import s from './../styles/CarBody.module.css'

interface CarBodyProps {
    car: ICar;
    deleteCar: (number: string) => void
}

const CarBody:FC<CarBodyProps> = ({car, deleteCar}) => {

    const arended = false;

    const urls: string[] = [
        require("./../images/car1.jpg"),
        require("./../images/car2.jpg"),
        require("./../images/car3.jpg")
    ];

    return (
        <div>
            <div className={s.header}>
                <Typography.Title level={2}>{car.brand}</Typography.Title>
                <Button danger onClick={() => {deleteCar(car.registrationNumber)}}>Удалить</Button>
            </div>
            <Divider style={{margin:"6px 0 24px 0"}}/>
            <MyCarousel urls={urls} />
            <Descriptions className={s.desc} column={1} labelStyle={{ width: "30%" }} bordered>
                <Descriptions.Item label="Цвет">{car.color}</Descriptions.Item>
                <Descriptions.Item label="Год">{car.year}</Descriptions.Item>
                <Descriptions.Item label="Номер">{car.registrationNumber}</Descriptions.Item>
                {
                    car.isAvailable
                    ? <Descriptions.Item label="Взять на прокат">Доступно</Descriptions.Item>
                    : <Descriptions.Item label="Владелец">11 АА 000000</Descriptions.Item>
                }
                
            </Descriptions>
            <div className={s.btns}>
                {
                    car.isAvailable 
                    ? <Button>Отправить в ремонт</Button>
                    : 
                    !arended
                    ? <Button type='primary'>Вернуть из ремонта</Button>
                    : <></>
                }                
            </div>

        </div>
    )
}

export default CarBody