import { Button, Descriptions, Divider, Typography } from 'antd';
import { FC, useState} from 'react'
import { ICar, IClient, IRent } from '../types/types'
import MyCarousel from '../UI/Carousel/MyCarousel';
import s from './../styles/CarBody.module.css'
import RentOutModal from './RentOutModal';

interface CarBodyProps {
    car: ICar;
    deleteCar: (number: string) => void;
    rentCar: (rent: IRent) => void;
    owner?: IRent | null;
    arended: boolean;
    clientList: IClient[];
    sendRepair: () => void;
    returnFromRepair: () => void;
}

const CarBody:FC<CarBodyProps> = ({car, deleteCar, rentCar, sendRepair, returnFromRepair, arended, clientList, owner}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const rentCarConfirm = (clientNumber: string, returnDate: string) => {
        const rentData: IRent = {
            driverLicenceNumber: clientNumber,
            registrationNumber: car.registrationNumber,
            rentDate: new Date().toLocaleDateString(),
            returnDate: returnDate,
        }
        rentCar(rentData);
        setIsOpen(false);
    }

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
                    : 
                    arended
                    ? <>
                        <Descriptions.Item label="Владелец">
                            <span className={s.ownerItem}><span>ФИО: </span>{clientList.find((client) => client.driverLicenceNumber === owner?.driverLicenceNumber)?.fullName}</span>
                            <span className={s.ownerItem}><span>Номер удостоверения: </span>{owner?.driverLicenceNumber}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Период аренды">{owner?.rentDate} - {owner?.returnDate}</Descriptions.Item>
                    </> 
                    : <Descriptions.Item label="Состояние">В ремонте</Descriptions.Item>
                }
            </Descriptions>

            <div className={s.btns}>
                {
                    car.isAvailable 
                    ? <>
                            <Button onClick={sendRepair}>Отправить в ремонт</Button>
                            <Button onClick={() => setIsOpen(true)}>Выдать на прокат</Button>
                            <RentOutModal isOpen={isOpen} closeModal={() => setIsOpen(false)} rentCarConfirm={rentCarConfirm} clientList={clientList} />
                    </>
                    : 
                    !arended
                    ? <Button onClick={returnFromRepair} type='primary'>Вернуть из ремонта</Button>
                    : <></>
                }                
            </div>

        </div>
    )
}

export default CarBody