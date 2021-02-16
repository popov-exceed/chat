import React from "react";
import {Avatar, List, Typography} from "antd";
import {CheckOutlined, UserOutlined} from "@ant-design/icons";
import moment from "moment";

const {Text, Paragraph} = Typography;


export default function Message({date,author,content,read,video}) {



    const viewSnippet = () => {
        return (<>
            <Paragraph>{content}</Paragraph>
            <iframe id="ytplayer" type="text/html" width="640" height="360"
                    src={`https://www.youtube.com/embed/${video}`}
                    frameBorder="0"/>
                    </>);
    };


    return(
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar style={{ backgroundColor: '#87d068' }}
                                icon={<UserOutlined />} />}
                title={<Text strong>{author.name}</Text>}
                description={video ? viewSnippet() : <Paragraph>{content}</Paragraph>}
            />

            <List.Item>{moment(date).format("HH:mm")}</List.Item>
            <List.Item>{read && <CheckOutlined style={{marginLeft:"10px"}}/>}</List.Item>
        </List.Item>
    )
}


