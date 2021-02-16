import React, {useEffect, useState} from "react";
import {Form, Input, Button, List, Layout, Row, Col, Avatar, Typography} from "antd";
import isAuthHoc from "../../hocs/auth";
import {useDispatch, useSelector} from "react-redux";
import socketAPI from "../../api/chat";

import {logout} from "../../store/actions/auth";
import { LogoutOutlined, SendOutlined, UserOutlined} from "@ant-design/icons";
import {animateScroll} from "react-scroll";


import Message from "../../components/Message";
import FieldMessageSend from "../../components/FieldMessageSend";

const { Content, Footer, Sider} = Layout;
const {Text, Title} = Typography;


const styles = {
    textInSideBar: {
        color: "#FFFFFF"
    },
    buttonInSideBar: {
        margin: "30px 10px"
    },
};


const socket = new socketAPI();
function Chat() {

    const dispatch = useDispatch();
    const [disabledSend, disableSend] = useState(true);
    const [closedSidebar, closeSidebar] = useState(false);

    const messages = useSelector(state => state.messages.list);
    const user = useSelector(state => state.auth.user);

    const onlineUsers = useSelector(state => state.onlineUsers.list);



    const viewMessages = (message) => {
        return(<Message date={message.date} video={message.video ? message.video : null} author={message.author} content={message.content} read={message.read} />)
    }

    const viewOnlineUsers = (user) => {
        return(<List.Item>
            <List.Item.Meta
            avatar={<Avatar style={{ backgroundColor: '#87d068' }}
                            icon={<UserOutlined />} />}
            title={!closedSidebar && <Text style={styles.textInSideBar} strong>{user.name}</Text>}

        />
        </List.Item>)
    }

    const singUp = () => {
        dispatch(logout());
        socket.disconnect();
    };

    useEffect(() => {
        socket.connect(() => disableSend(false),() => disableSend(true)).catch(e => console.log(e.message));
        socket.on("connected",({onlineUsers,lastsMessages}) => {
            dispatch({type: "GET_USERS", payload: {users: onlineUsers}});
            const unReadMessages = lastsMessages.filter(message => !message.read);
            unReadMessages.forEach(message => {
                user._id !== message.author._id && socket.emit("read message", message._id);
            })
            dispatch({type: "GET_MESSAGES", payload: {messages: lastsMessages}});
            animateScroll.scrollToBottom({containerId: "chat"})
        });
        socket.on("new message", (message) => {
            dispatch({type: "NEW_MESSAGE", payload: {message}});
            animateScroll.scrollToBottom({containerId: "chat"})
            user._id !== message.author._id && socket.emit("read message", message._id);
        });
        socket.on("new user", (user) => dispatch({type: "NEW_USER", payload: {user}}));
        socket.on("read message", (messageId) => dispatch({type: "READ_MESSAGE", payload: {messageId}}));
        socket.on("user exit", (user) => dispatch({type: "LEAVE_USER", payload: {user}}))
        return () => socket.disconnect();
    }, []);
    return(
        <div style={{display: "flex", height: "100%"}}>
        <Layout  style={{flexGrow: 0}}>
            <Sider collapsible onCollapse={(collapsed) => closeSidebar(collapsed)}>
                <Button onClick={singUp} shape="circle" icon={<LogoutOutlined />} style={styles.buttonInSideBar}></Button>
                {!closedSidebar && <Title level={5}  style={styles.textInSideBar}>Online users:</Title>}
                <List style={{paddingLeft: "20px"}} split={false} renderItem={viewOnlineUsers} dataSource={onlineUsers}></List>
            </Sider>
        </Layout>
        <Layout style={{paddingLeft: "30px"}}>
         <Content>
             <List id="chat" style={{maxHeight: "90vh", overflowY: "scroll"}} renderItem={viewMessages} dataSource={messages} locale={{emptyText: disabledSend ? "Not connection" : "Not messages"}}></List>
         </Content>
        <Footer>
            <FieldMessageSend socket={socket} disabledSend={disabledSend}/>
        </Footer>
    </Layout>

        </div>)
}

export default isAuthHoc(Chat);
