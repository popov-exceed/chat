import {Alert, Button, Form, Input, Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/actions/auth";
import {Redirect} from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const error = useSelector(state => state.auth.error);
    const singIn = ({userName}) => {
       dispatch(login(userName));
    };
    return (<Layout>
        <Form name="name" onFinish={singIn}>
            <Form.Item label="User name" name="userName">
                <Input/>
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit">Sing in</Button>
            </Form.Item>
        </Form>
        {error && <Alert message={error.response.data.message} type="error" showIcon />}
        {token && <Redirect to="/"/>}
    </Layout>);
}

export default Login;
