import { FC } from 'react'
import { IClient } from '../types/types'
import {Descriptions} from 'antd'
import s from './../styles/ClientItem.module.css'

interface ClientProps {
    client: IClient;
}

const ClientItem: FC<ClientProps> = ({ client }) => {
    return (
        <Descriptions className={s.wrapper} title={<div className={s.name}>{client.fullName}</div>}>
            <Descriptions.Item label='Номер водительского удостоверения'>{client.driverLicenceNumber}</Descriptions.Item>
            <Descriptions.Item label='Адрес'>{client.address}</Descriptions.Item>
        </Descriptions>
    )
}

export default ClientItem