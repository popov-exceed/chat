import { useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

function isAuthHoc(Component) {
    const Wrapper = (props) => {
        const loggedIn = useSelector((state) => state.auth.loggedIn);
        return <>{loggedIn ? <Component {...props} /> : <Redirect to="/login" />}</>;
    };
    return Wrapper;
}

export default isAuthHoc;
