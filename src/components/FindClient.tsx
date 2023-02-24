import { Button, Divider, Modal } from 'antd';
import { Typography, Input } from 'antd';
import { FC, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { DeleteClientAC, FindClientAC } from '../store/reducers/mainReducer';
import { IsLicence } from '../utils/regexpLicence';
import s from './../styles/FindClient.module.css'
import FindedClient from './FindedClient';
import { CheckOutlined } from '@ant-design/icons'

const FindClient:FC = () => {

    const dispatch = useDispatch();
    const {findedClient} = useTypedSelector(state => state.main);

    const [visible, setVisible] = useState<boolean>(false);
    const [query, setQuery] = useState<string>('');
    const [valid, setValid] = useState<boolean>(false);

    useEffect(() => {
        setValid(IsLicence(query));
    }, [query])

    const handler = () => {
        dispatch(FindClientAC(query));
        setVisible(true);
    }

    const onClose = () => {
        setVisible(false);
    }

    const onConfirm = () => {
        setVisible(false);
        setQuery('');
    }

    const onDelete = () => {
        if (findedClient)
            dispatch(DeleteClientAC(findedClient?.driverLicenceNumber))
        setVisible(false);
        setQuery('');
        alert("Клиент удалён!")
    }

    return (
        <div>
            <Typography.Title level={3}>Найти клиента</Typography.Title>

            <Typography.Paragraph>
                Номер водительского удостоверения – строка формата «RR AA NNNNNN»,

                <ul className={s.list}>
                    <li>RR – код региона (цифры);</li>
                    <li>AA – серия (буквы из следующего множества: А, В, Е, К, М, Н, О, Р, С, Т, У, Х);</li>
                    <li>NNNNNN –порядковый номер удостоверения (цифры)</li>
                </ul>

                Код, серия и номер отделяются друг от друга пробелами;
            </Typography.Paragraph>

            <Input suffix={valid ? <CheckOutlined/> : null} value={query} onChange={(e) => {setQuery(e.target.value)}} placeholder='Номер водительского удостоверения...' maxLength={12} showCount allowClear/>

            <div className={s.btnBox}>
                <Button disabled={!valid} onClick={handler} type='primary'>Найти</Button>
            </div>

            {
                visible
                ? 
                <Modal
                    title={
                        <div>
                            <div>Поиск клиента</div>
                            <Divider/>
                        </div>
                    }
                    open={visible}
                    centered
                    onCancel={onClose}
                    onOk={onConfirm}
                    width={800}
                    footer={
                        <>
                        <Button onClick={onDelete} danger>Удалить</Button>
                        <Button onClick={onClose}>Отмена</Button>
                        <Button onClick={onConfirm} type='primary'>Ок</Button>
                        </>
                    }
                >
                    <FindedClient client={findedClient}/>
                </Modal>
                : 
                <></>
            }
        </div>
    )
}

export default FindClient