import { Descriptions, Divider, Typography, Button } from 'antd'
import { FC } from 'react'
import { IClient, IRent } from '../types/types'
import s from './../styles/FindedClient.module.css'

interface FindedClientProps {
    client: IClient | null;
    rentedCars: IRent[];
    unrentCar: (registrationNumber: string) => void;
}

const FindedClient:FC<FindedClientProps> = ({client, rentedCars, unrentCar}) => {

    if (!client) 
        return (
            <div className={s.wrapper}>
                <Typography.Title level={2}>
                    Клиент по данному номеру не найден!
                </Typography.Title>
            </div>
        )

    return (
        <>
            <Divider/>
            <Descriptions labelStyle={{ width: '30%' }} column={1} bordered>
                <Descriptions.Item label='ФИО'>{client.fullName}</Descriptions.Item>
                <Descriptions.Item label='Номер водительского удостоверения'>{client.driverLicenceNumber}</Descriptions.Item>
                <Descriptions.Item label='Адрес'>{client.address}</Descriptions.Item>
                <Descriptions.Item label='Паспортные данные'>{client.passportData}</Descriptions.Item>
            </Descriptions>

            {
                rentedCars.length
                ?
                <>
                    <Divider/>
                    <Descriptions title='Арендованные автомобили' labelStyle={{width: '20%'}} column={1} bordered>
                        {
                            rentedCars.map((car) => <Descriptions.Item key={car.registrationNumber} label={car.registrationNumber}>
                                <div className={s.rentData}>
                                    <span>
                                        {car.rentDate} - {car.returnDate}
                                    </span>
                                    <Button type='dashed' onClick={() => unrentCar(car.registrationNumber)}>Вернуть</Button>
                                </div>
                                
                            </Descriptions.Item>)
                        }
                    </Descriptions>
                </>
                : 
                <></>        
            }

        </>
    )
}

export default FindedClient