import { useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

function isAuthHoc(Component) {
    const Wrapper = (props) => {
        const token = useSelector((state) => state.auth.token);
        return <>{token ? <Component {...props} /> : <Redirect exact to="/login" />}</>;
    };
    return Wrapper;
}

export default isAuthHoc;
