import { CheckOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IsRegNumber } from '../utils/regexpCarNumber';
import s from './../styles/FindCar.module.css'

const FindCar:FC = () => {

    const dispatch = useDispatch();
    const route = useNavigate();

    const [valid, setValid] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        IsRegNumber(value) 
                        ? setValid(true)
                        : setValid(false)
    }, [value])

    const handler = ():void => {
        route(`/cars/${value}`);
        setValid(false);
        setValue('');
    }

    return (
        <div>
           <Typography.Title level={3}>Найти автомобиль</Typography.Title>

           <Typography.Paragraph>
            Государственный регистрационный номер – строка формата «ANNNAA-NN»
                <ul className={s.list}>
                    <li>N – цифра;</li>
                    <li>A – буква из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х;</li>
                </ul>
            </Typography.Paragraph>

            <Input suffix={valid ? <CheckOutlined/> : <></>} value={value} onChange={(e) => setValue(e.target.value)} placeholder='Государственный регистрационный номер...' showCount maxLength={9}/>

            <div className={s.btnBox}>
                <Button disabled={!valid} type='primary' onClick={handler}>Найти</Button>
            </div>
        </div>
    )
}

export default FindCar