import {FC} from 'react'
import Logo from '../Logo/Logo'
import s from './Navbar.module.css'
import { CarOutlined, IdcardOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'

const Navbar:FC = () => {

    const route = useNavigate();

    return (
        <header className={s.wrapper}>
            <Logo/>
            <div className={s.navigation}>
                <ButtonGroup>
                    <Button onClick={() => {route('/clients')}} className={s.navBtn} icon={<IdcardOutlined/>}>Клиенты</Button>
                    <Button onClick={() => {route('/cars')}} className={s.navBtn} icon={<CarOutlined/>}>Автомобили</Button>                    
                </ButtonGroup>
            </div>
        </header>
    )
}

export default Navbar