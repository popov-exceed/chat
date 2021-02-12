import React, {useEffect} from "react";
import { Form, Input, Button, List} from "antd";
import isAuthHoc from "../hocs/auth";

import {useDispatch, useSelector} from "react-redux";
import io from 'socket.io-client';

const socket = io("ws://localhost:8000");
function Chat() {
    const dispatch = useDispatch();

    const sendMessage = (message) => {
       socket.emit("new message", message);
    };
    const messages = useSelector(state => state.messages.list);
    const viewMessages = (message) => {
        return(<List.Item>
            <List.Item.Meta title={message.author} description={message.content}/>
        </List.Item>)
    }
    useEffect(() => {
        socket.on("message", (message) => dispatch({type: "NEW_MESSAGE", payload: {message}}) )
    }, []);
    return(<>
        <List renderItem={viewMessages} dataSource={messages}>
        </List>
        <Form name="name" layout="inline" onFinish={sendMessage}>
            <Form.Item name="message">
                <Input/>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">Send message</Button>
            </Form.Item>
        </Form>
    </>)
}

export default isAuthHoc(Chat);
