import { Descriptions, Typography } from 'antd'
import {FC} from 'react'
import { IClient } from '../types/types'
import s from './../styles/FindedClient.module.css'

interface FindedClientProps {
    client: IClient | null,
}

const FindedClient:FC<FindedClientProps> = ({client}) => {

    if (!client) 
        return (
            <div className={s.wrapper}>
                <Typography.Title level={2}>
                    Клиент по данному номеру не найден!
                </Typography.Title>
            </div>
        )

    return (
        <Descriptions labelStyle={{ width: '40%' }} column={1} bordered>
            <Descriptions.Item label='ФИО'>{client.fullName}</Descriptions.Item>
            <Descriptions.Item label='Номер водительского удостоверения'>{client.driverLicenceNumber}</Descriptions.Item>
            <Descriptions.Item label='Адрес'>{client.address}</Descriptions.Item>
            <Descriptions.Item label='Паспортные данные'>{client.passportData}</Descriptions.Item>
        </Descriptions>
    )
}

export default FindedClient