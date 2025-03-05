import "./styles.scss";
import Logo from "../ui/Logo/Logo.jsx";
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom";
import Button from "../ui/Button/Button.jsx";
import UserBar from "../UserBar/UserBar.jsx";
import BorderButton from "../ui/BorderButton/BorderButton.jsx";

const Header = () => {
    const authUser = useSelector(state => state.auth.authUser);
    const {pathname: currentPath} = useLocation();

    return (
        <header className="header">
            <div className="container">
                <Logo/>

                {currentPath !== '/login' && currentPath !== '/register' ?
                    <div className="header_controls">
                        {
                            authUser ?
                                <UserBar/>
                                :
                                <div className="controls_wrap">
                                    <Link to="/register">
                                        <BorderButton type="light">Регистрация</BorderButton>
                                    </Link>
                                    <Link to="/login">
                                        <Button>Войти</Button>
                                    </Link>
                                </div>
                        }
                    </div>
                    : ""
                }
            </div>
        </header>
    );
};

export default Header;