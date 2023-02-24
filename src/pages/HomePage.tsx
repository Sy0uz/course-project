import { Divider } from 'antd'
import {FC} from 'react'
import FindClient from '../components/FindClient'
import RegNewClient from '../components/RegNewClient'

const HomePage:FC = () => {
    return (
        <div>
            <RegNewClient/>

            <Divider style={{margin: '1rem 0'}}/>
            
            <FindClient/>
        </div>
    )
}

export default HomePage