import React, {useEffect, useState} from "react";
import {Form, Input, Button, List, Layout} from "antd";
import isAuthHoc from "../../hocs/auth";
import {useDispatch, useSelector} from "react-redux";
import socketAPI from "../../api/chat";
import moment from "moment";
import {logout} from "../../store/actions/auth";
import {CheckOutlined} from "@ant-design/icons";

const { Header, Content, Footer, Sider} = Layout;
const socket = new socketAPI();
function Index() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [disabledSend, disableSend] = useState(true);
    const sendMessage = (values) => {
       socket.emit("new message", {content: values.message});
       form.resetFields();
    };
    const messages = useSelector(state => state.messages.list);
    const onlineUsers = useSelector(state => state.onlineUsers.list);
    const viewMessages = (message) => {
        return(<List.Item>
            <List.Item.Meta title={message.author.name} description={message.content}/>
            <List.Item>{moment(message.date).format("HH:mm")}</List.Item>
            <List.Item>{message.read && <CheckOutlined />}</List.Item>
        </List.Item>)
    }

    const viewOnlineUsers = (user) => {
        return(<List.Item style={{color: "#ffffff"}}>
            {user.name}
        </List.Item>)
    }

    const singUp = () => {
        dispatch(logout());
        socket.disconnect();
    }

    useEffect(() => {
        socket.connect(() => disableSend(false),() => disableSend(true)).catch(e => console.log(e.message));
        socket.on("connected",({onlineUsers,lastsMessages}) => {
            dispatch({type: "GET_USERS", payload: {users: onlineUsers}});
            dispatch({type: "GET_MESSAGES", payload: {messages: lastsMessages}});
        });
        socket.on("new message", (message) => dispatch({type: "NEW_MESSAGE", payload: {message}}));
        socket.on("user", (user) => dispatch({type: "NEW_USER", payload: {user}}));
        return () => socket.disconnect();
    }, []);
    return(
        <div style={{display: "flex", height: "100%"}}>
        <Layout style={{flexGrow: 0}}>
            <Sider collapsible>
                <List renderItem={viewOnlineUsers} dataSource={onlineUsers}></List>
                <Button onClick={singUp} type="primary">Logout</Button>
            </Sider>
        </Layout>
        <Layout >
         <Content>
             <List style={{maxHeight: "90vh", overflowY: "scroll"}} renderItem={viewMessages} dataSource={messages} locale={{emptyText: disabledSend ? "Not connection" : "Not messages"}}></List>
         </Content>
        <Footer>
            <Form name="name" form={form} onFinish={sendMessage} layout="inline" wrapperCol={{lg: 2}}>
                <Form.Item name="message" rules={[{ required: true, message: 'Please input your message!' }]} >
                    <Input placeholder="Enter a new message..."/>
                </Form.Item>
                <Form.Item >
                    <Button type="primary" htmlType="submit" disabled={disabledSend}>Send message</Button>
                </Form.Item>
            </Form>
        </Footer>
    </Layout>
        </div>)
}

export default isAuthHoc(Index);
