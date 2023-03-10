import { Button, Modal } from 'antd';
import { Typography, Input } from 'antd';
import { FC, useState, useMemo, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { DeleteClientAC, FindClientAC } from '../store/reducers/mainReducer';
import { IsLicence } from '../utils/regexpLicence';
import s from './../styles/FindClient.module.css'
import FindedClient from './FindedClient';
import { CheckOutlined } from '@ant-design/icons'
import { IRent } from '../types/types';
import { RemoveRentDataAC } from '../store/reducers/rentReducer';
import { ChangeCarAvaliableAC } from '../store/reducers/carsReducer';

const FindClient:FC = () => {

    const dispatch = useDispatch();

    const {findedClient} = useTypedSelector(state => state.main);
    const {LinkedList} = useTypedSelector(state => state.rent);

    const [visible, setVisible] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [rentedCars, setRentedCars] = useState<IRent[]>([]);

    const valid = useMemo(() => {
        return IsLicence(query);
    }, [query])

    useEffect(() => {
        if (findedClient && LinkedList) {
            let rentedCarsResult:IRent[] = LinkedList.FindClientRent(findedClient.driverLicenceNumber);
            if (rentedCarsResult.length)
                setRentedCars(rentedCarsResult);
        }
    }, [findedClient])

    const handler = ():void => {
        dispatch(FindClientAC(query));
        setVisible(true);
    }

    const onClose = ():void => {
        setVisible(false);
    }

    const onConfirm = ():void => {
        setVisible(false);
        setQuery('');
    }

    const onDelete = ():void => {
        if (findedClient)
            dispatch(DeleteClientAC(findedClient?.driverLicenceNumber))
        if (rentedCars.length)
            for (const iterator of rentedCars) {
                dispatch(RemoveRentDataAC(iterator.registrationNumber));
                dispatch(ChangeCarAvaliableAC(iterator.registrationNumber, true));
            }
        setVisible(false);
        setQuery('');
        alert("Клиент удалён!")
    }

    const unrentCar = (registrationNumber:string):void => {
        dispatch(RemoveRentDataAC(registrationNumber));
        dispatch(ChangeCarAvaliableAC(registrationNumber, true));
        setRentedCars(rentedCars.filter((car) => car.registrationNumber !== registrationNumber));
    }

    return (
        <div>
            <Typography.Title level={3}>Найти клиента</Typography.Title>

            <Typography.Paragraph>
                Номер водительского удостоверения – строка формата «RR AA NNNNNN»

                <ul className={s.list}>
                    <li>RR – код региона (цифры);</li>
                    <li>AA – серия (буквы из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х);</li>
                    <li>NNNNNN – порядковый номер удостоверения (цифры)</li>
                </ul>

                Код, серия и номер отделяются друг от друга пробелами;
            </Typography.Paragraph>

            <Input suffix={valid ? <CheckOutlined/> : <></>} value={query} onChange={(e) => {setQuery(e.target.value)}} placeholder='Номер водительского удостоверения...' maxLength={12} showCount allowClear/>

            <div className={s.btnBox}>
                <Button disabled={!valid} onClick={handler} type='primary'>Найти</Button>
            </div>


            <Modal
                title='Поиск клиента'
                open={visible}
                centered
                onCancel={onClose}
                onOk={onConfirm}
                width={800}
                footer={
                    findedClient
                    ?
                    <>
                        <Button onClick={onDelete} danger>Удалить</Button>
                        <Button onClick={onClose}>Отмена</Button>
                        <Button onClick={onConfirm} type='primary'>Ок</Button>
                    </>
                    :
                    <>
                            <Button onClick={onClose}>Отмена</Button>
                            <Button onClick={onConfirm} type='primary'>Ок</Button>
                    </>
                }
            >
                <FindedClient client={findedClient} rentedCars={rentedCars} unrentCar={unrentCar}/>
            </Modal>
        </div>
    )
}

export default FindClient