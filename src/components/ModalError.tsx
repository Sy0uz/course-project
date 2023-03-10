import { Button, Layout, Modal, Row, Typography } from 'antd'
import { FC } from 'react'

interface ModalProps {
    open: boolean;
    onOk: () => void;
    body: string;
}

const ModalError:FC<ModalProps> = ({open, onOk, body}) => {
    return (
        <Modal
            open={open}
            onCancel={onOk}
            title='Ошибка!!!'
            footer={
                <div>
                    <Button type='primary' onClick={onOk}>ОК</Button>
                </div>
            }
        >
            <Layout style={{minHeight:'140px', display:'flex', justifyContent:'center', backgroundColor:'unset'}}>
                <Row justify='center'>
                    <Typography.Title level={4}>{body}</Typography.Title>
                </Row>                
            </Layout>
        </Modal>
    )
}

export default ModalError