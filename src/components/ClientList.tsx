import {ChangeEvent, FC, useState} from 'react'
import { IClient } from '../types/types'
import {Input} from 'antd';
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
                {list.map((item) => <ClientItem key={item.passportData} client={item}/>)}
            </div>
        </div>
    )
}

export default ClientList