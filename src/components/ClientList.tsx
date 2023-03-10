import { ChangeEvent, FC } from 'react'
import { IClient } from '../types/types'
import { Input, Typography, Row } from 'antd';
import ClientItem from './ClientItem';

interface ClientListProps {
    list: IClient[];
    value: string;
    onChange: (str: string) => void;
}

const ClientList:FC<ClientListProps> = ({list, value, onChange}) => {

    const handler = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div>
            <Input value={value} onChange={handler} placeholder='Найти клиента...'/>
            <div>
                {
                    list.length
                    ? list.map((item) => <ClientItem key={item.passportData} client={item}/>)
                    : <Row justify='center' style={{marginTop:'2rem'}}><Typography.Title level={3}>Список пуст!</Typography.Title></Row>
                }
            </div>
        </div>
    )
}

export default ClientList