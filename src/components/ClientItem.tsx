import { FC } from 'react'
import { IClient } from '../types/types'
import { Descriptions } from 'antd'
import s from './../styles/ClientItem.module.css'

interface ClientProps {
    client: IClient;
}

const ClientItem: FC<ClientProps> = ({ client }) => {
    return (
        <Descriptions labelStyle={{width:'25%', fontWeight:'500'}} column={1} bordered className={s.wrapper} title={<div className={s.name}>{client.fullName}</div>}>
            <Descriptions.Item label='Номер вод. удостоверения'>{client.driverLicenceNumber}</Descriptions.Item>
            <Descriptions.Item label='Адрес'>{client.address}</Descriptions.Item>
        </Descriptions>
    )
}

export default ClientItem