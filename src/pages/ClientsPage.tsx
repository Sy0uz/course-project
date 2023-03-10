import {FC, useMemo} from 'react'
import { IClient } from '../types/types';
import ClientList from '../components/ClientList'
import { Typography, Divider, Button } from 'antd';
import s from './../styles/ClientsPage.module.css'
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { ChangeQueryAC } from '../store/reducers/clientsReducer';
import { ClearTreeAC } from '../store/reducers/mainReducer';
import Wrapper from '../UI/Wrapper/Wrapper';
import { ClearRentListAC } from '../store/reducers/rentReducer';
import { ChangeCarAvaliableAC } from '../store/reducers/carsReducer';

const ClientsPage:FC = () => {

    const { ClientsTree } = useTypedSelector(state => state.main);
    const { ClientsQuery } = useTypedSelector(state => state.clients);
    const { HashCars } = useTypedSelector(state => state.cars);

    const dispatch = useDispatch();

    const setQuery = (str: string) => dispatch(ChangeQueryAC(str));

    const handler = ():void => {
        dispatch(ClearTreeAC());
        dispatch(ClearRentListAC());
        if (HashCars)
            for (const iterator of HashCars?.GetArray()) {
                iterator && dispatch(ChangeCarAvaliableAC(iterator.registrationNumber, true));
            }
    }

    const list:IClient[] = useMemo(() => {

        if (!ClientsTree) return [];
        if (!ClientsQuery) return ClientsTree.treeLists;

        return ClientsTree.Find(ClientsQuery);;

    }, [ClientsQuery, ClientsTree, ClientsTree?.treeLists])

    return (
        <Wrapper className='h100'>
            <div className={s.header}>
                <Typography.Title level={2}>Клиенты</Typography.Title>
                <Button danger onClick={handler}>Удалить данные</Button>             
            </div>

            <Divider className={s.divider}/>
            {
                ClientsTree && <ClientList list={list} value={ClientsQuery} onChange={(str:string) => {setQuery(str)}}/>
            }
        </Wrapper>
    )
}

export default ClientsPage