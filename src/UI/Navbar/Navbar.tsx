import { FC, useState } from 'react'
import Logo from '../Logo/Logo'
import s from './Navbar.module.css'
import { CarOutlined, IdcardOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Button, Menu } from 'antd'
import ButtonGroup from 'antd/es/button/button-group'

const Navbar:FC = () => {

    const route = useNavigate();

    const [open, setOpen] = useState<boolean>(false);

    return (
        <header className={s.wrapper}>
            <Logo />            

            <div className={open ? [s.navigation, s.active].join(' ') : s.navigation}>
                <ButtonGroup>
                    <Button onClick={() => {route('/clients')}} className={s.navBtn} icon={<IdcardOutlined/>}>Клиенты</Button>
                    <Button onClick={() => {route('/cars')}} className={s.navBtn} icon={<CarOutlined/>}>Автомобили</Button>                    
                </ButtonGroup>
            </div>

            <Button className={s.burgerBtn} icon={open ? <CloseOutlined /> : <MenuOutlined />} onClick={() => {setOpen(!open)}}/>
        </header>
    )
}

export default Navbar