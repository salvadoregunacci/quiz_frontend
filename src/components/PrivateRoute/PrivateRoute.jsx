import {Navigate} from "react-router-dom";

const PrivateRoute = ({children , privateRule}) => {
    return (
        privateRule ? children : <Navigate to="/" />
    );
};

export default PrivateRoute;