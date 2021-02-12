import {Button, Form, Input} from "antd";
import {useDispatch} from "react-redux";
import {login} from "../store/actions/auth";

function Login() {
    const dispatch = useDispatch();
    const singIn = ({userName}) => {
       dispatch(login(userName));
    }
    return (<Form name="name" onFinish={singIn}>
        <Form.Item label="User name" name="userName">
            <Input/>
        </Form.Item>
        <Form.Item >
            <Button type="primary" htmlType="submit">Sing in</Button>
        </Form.Item>
    </Form>);
}

export default Login;
