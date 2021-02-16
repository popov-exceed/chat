import React from "react";
import {Button, Form, Input} from "antd";
import {SendOutlined} from "@ant-design/icons";



export default function FieldMessageSend({socket, disabledSend}) {
    const [form] = Form.useForm();

    const sendMessage = (values) => {
        socket.emit("new message", {content: values.message});
        form.resetFields();
    };

    return(<Form name="name" form={form} onFinish={sendMessage}>
        <Form.Item name="message" rules={[{ required: true, message: 'Please input your message!' }]} >
            <Input size="large" placeholder="Enter a new message..."  suffix={<Button type="primary" htmlType="submit" icon={<SendOutlined />} disabled={disabledSend} />}/>
        </Form.Item>

    </Form>);
}


