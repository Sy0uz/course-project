import {FC, useState} from 'react';
import s from './MyCarousel.module.css';

interface CarouselProps {
    urls: string[];
}

const MyCarousel:FC<CarouselProps> = ({urls}) => {

    const [curr, setCurr] = useState<number>(0);

    return (
        <div className={s.wrapper}>
            <div className={s.body}>
                {urls.map((url, idx) => <div key={url} className={idx === curr ? [s.box, s.active].join(' ') : s.box}><img key={url} src={url} alt={`img-${idx}`}/></div>)}
            </div>
            <div className={s.btns}>
                {urls.map((i, idx) => <button key={idx} className={idx === curr ? s.activeBtn : ''} onClick={() => setCurr(idx)}/>)}
            </div>
        </div>
    )
}

export default MyCarousel