import React, {useEffect, useState} from "react";
import {Form, Input, Button, List, Layout} from "antd";
import isAuthHoc from "../../hocs/auth";
import {useDispatch, useSelector} from "react-redux";
import socketAPI from "../../api/chat";
import moment from "moment";
const { Header, Content, Footer, Sider} = Layout;
const socket = new socketAPI();
function Index() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [disabledSend, disableSend] = useState(true);
    const sendMessage = (values) => {
       socket.emit("new message", {message: values.message, user: "Alex"});
       form.resetFields();
    };
    const messages = useSelector(state => state.messages.list);
    const viewMessages = (message) => {
        return(<List.Item>
            <List.Item.Meta title={message.author} description={message.message}/>
            <List.Item>{moment(message.date).format("HH:mm")}</List.Item>
            <List.Item>{message.message}</List.Item>
        </List.Item>)
    }
    useEffect(() => {
        socket.connect(() => disableSend(false),() => disableSend(true)).catch(e => console.log(e.message));
        socket.on("message", (message) => {dispatch({type: "NEW_MESSAGE", payload: {message}})} );
        return () => socket.disconnect();
    }, []);
    return(
        <div style={{display: "flex", height: "100%"}}>
        <Layout style={{flexGrow: 0}}>
            <Sider collapsible >
            </Sider>
        </Layout>
        <Layout >
         <Content>
             <List renderItem={viewMessages} dataSource={messages} locale={{emptyText: disabledSend ? "Not connection" : "Not messages"}}></List>
         </Content>
        <Footer>
            <Form name="name" form={form} onFinish={sendMessage} layout="inline">
                <Form.Item name="message" rules={[{ required: true, message: 'Please input your message!' }]}>
                    <Input placeholder="Enter a new message..."/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" disabled={disabledSend}>Send message</Button>
                </Form.Item>
            </Form>
        </Footer>
    </Layout>
        </div>)
}

export default isAuthHoc(Index);
