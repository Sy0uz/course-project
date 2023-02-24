import {FC} from 'react'
import { Link } from 'react-router-dom'
import s from './Logo.module.css'

const Logo:FC = () => {
    return (
        <Link to={'/'} className={s.wrapper}>
            БЮРО ПРОКАТА АВТОМОБИЛЕЙ
        </Link>
    )
}

export default Logo