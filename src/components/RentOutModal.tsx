import { FC, useState } from 'react'
import { Form, Select, Modal, DatePicker, Row, Button } from 'antd';
import { IClient } from '../types/types';
import 'dayjs/locale/ru'
import locale from 'antd/es/date-picker/locale/ru_RU';

interface RentOutProps {
    isOpen: boolean;
    closeModal: () => void;
    rentCarConfirm: (clientNumber: string, returnDate: string) => void;
    clientList: IClient[];
}

const RentOutModal:FC<RentOutProps> = ({isOpen, closeModal, rentCarConfirm, clientList}) => {

    const [clientNumber, setClientNumber] = useState<string>('');
    const [returnDate, setReturnDate] = useState<string>('');

    const onFinish = () => {
        rentCarConfirm(clientNumber, returnDate);
        setClientNumber('');
    }

    const dateChange = (date: Date):void => {
        let currentDate = new Date();
        if (date.getTime() > currentDate.getTime())
            setReturnDate(date.toLocaleDateString());
        else 
            setReturnDate('');
    }

    return (
        <Modal
            centered
            title="Выдать машину на прокат."
            open={isOpen}
            onCancel={closeModal}
            footer={null}
        >
            <Form
                style={{ marginTop: '1rem' }}
                labelCol={{ span: 3 }}
                onFinish={onFinish}
            >
                <Form.Item label='Клиент' name='client'>
                    <Select
                        style={{ width: "100%" }}
                        placeholder='Выберите клиента...'
                        allowClear
                        options={clientList.map(client => ({ value: client.driverLicenceNumber, label: `${client.fullName} ||| ${client.driverLicenceNumber}` }))}
                        value={clientNumber}
                        onChange={(value) => {
                            setClientNumber(value);
                        }}
                    />
                </Form.Item>
                <Form.Item label='Дата' name='date'>
                    <DatePicker
                        onChange={value => {
                            value && dateChange(value.toDate());
                        }}
                        locale={locale}
                        bordered
                    />
                </Form.Item>
                <Form.Item style={{ margin: 0 }}>
                    <Row justify='end'>
                        <Button type='primary' htmlType='submit' disabled={returnDate && clientNumber ? false : true}>Подвердить</Button>
                    </Row>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RentOutModal