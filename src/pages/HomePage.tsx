import { Divider } from 'antd'
import {FC} from 'react'
import AddNewCar from '../components/AddNewCar/AddNewCar'
import FindCar from '../components/FindCar'
import FindClient from '../components/FindClient'
import RegNewClient from '../components/RegNewClient/RegNewClient'
import Wrapper from '../UI/Wrapper/Wrapper'

const HomePage:FC = () => {

    return (
        <div>
            <Wrapper>
                <RegNewClient/>
                <Divider style={{margin: '1rem 0'}}/>
                <FindClient/>
            </Wrapper>

            <Wrapper>
                <AddNewCar/>
                <Divider style={{margin: '1rem 0'}}/>
                <FindCar/>
            </Wrapper>
        </div>
    )
}

export default HomePage