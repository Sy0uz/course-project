import {FC, PropsWithChildren} from 'react'
import s from './Wrapper.module.css';


interface WrapperProps extends PropsWithChildren {
    className?: string;
}

const Wrapper:FC<WrapperProps> = ({children, className}) => {

    const styleClass = className ? [s.wrapper, className].join(' ') : s.wrapper;

    return (
        <div className={styleClass}>
            {children}
        </div>
    )
}

export default Wrapper