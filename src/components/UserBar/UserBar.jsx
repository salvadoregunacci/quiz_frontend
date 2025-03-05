import {Link, useLocation} from "react-router-dom";
import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import Dropdown from "../Dropdown/Dropdown.jsx";
import DropHeader from "../Dropdown/DropHeader.jsx";
import DropItem from "../Dropdown/DropItem.jsx";
import DropContent from "../Dropdown/DropContent.jsx";
import {logOut} from "../../redux/slices/userSlice.js";
import Modal from "../Modal/Modal.jsx";
import {useEffect, useRef, useState} from "react";
import Tooltip from "../Tooltip/Tooltip.jsx";
import TooltipHeader from "../Tooltip/TooltipHeader.jsx";
import TooltipContent from "../Tooltip/TooltipContent.jsx";
import BorderButton from "../ui/BorderButton/BorderButton.jsx";
import Button from "../ui/Button/Button.jsx";

const UserBar = () => {
    const authUser = useSelector(state => state.auth.authUser);
    const [visibleModal, setVisibleModal] = useState(false);
    const dispatch = useDispatch();
    const isAddCoins = useSelector(state => state.auth.isAddCoins);
    const isDecCoins = useSelector(state => state.auth.isDecCoins);
    const locatiion = useLocation();
    const [burgerActive, setBurgerActive] = useState(false);
    const burgerRef = useRef(null);

    function logoutHandler() {
        setVisibleModal(true);
    }

    function closeHandler() {
        setVisibleModal(false);
    }

    function confirmLogoutHandler() {
        dispatch(logOut());
    }

    function clickBurgerHandler(e) {
        const parent = e.target.closest(".header__burger");
        setBurgerActive(prev => !prev);

        if (parent) {
            parent.classList.toggle("active");
        }
    }

    useEffect(() => {
        burgerRef.current.classList.remove("active");
        setBurgerActive(false);
    }, [locatiion.pathname]);

    return (
        <div className="user_bar">
            <Modal isVisible={visibleModal} closeCallback={closeHandler}>
                <div className="confirm_logout">
                    <h3>Выйти из аккаунта?</h3>

                    <div className="confirm_logout__wrap">
                        <BorderButton type="danger" onClick={confirmLogoutHandler}>Да</BorderButton>
                        <BorderButton type="success" onClick={closeHandler}>Нет</BorderButton>
                    </div>
                </div>
            </Modal>

            <div className="header__burger" onClick={clickBurgerHandler} ref={burgerRef}>
                <span></span>
            </div>

            <div className={`user_bar__content ${burgerActive ? "active" : ""}`}>
                <div className="profile_navigation">
                    {
                        locatiion.pathname !== "/"
                        &&
                        <Link to="/" className="profile_shop_link profile_shop_menu_btn">
                            <BorderButton type="light" style={{borderWidth: "1px", fontSize: "16px"}}
                                          className="profile_menu_btn">
                                <span>В меню</span>
                            </BorderButton>
                        </Link>
                    }


                    <Link to="/rating" className="profile_shop_link profile_shop_menu_btn">
                        <BorderButton type="light" style={{borderWidth: "1px", fontSize: "16px"}}
                                      className="profile_menu_btn">
                            <img src="/images/icons/crown.svg" alt="crown" style={{transform: "translateY(-2px)"}}/>
                            <span>Топ-10</span>
                        </BorderButton>
                    </Link>

                    {
                        window.innerWidth <= 935 &&
                        <Link to="/me" className="profile_shop_link profile_shop_menu_btn">
                            <BorderButton type="light" style={{borderWidth: "1px", fontSize: "16px"}}
                                          className="profile_menu_btn">
                                <span>Мой профиль</span>
                            </BorderButton>
                        </Link>
                    }

                    <Link to="/shop" className="profile_shop_link">
                        <Button type="warning" style={{borderWidth: "2px", fontSize: "16px"}}
                                className="profile_menu_btn">
                            <span>Магазин</span>
                        </Button>
                    </Link>
                </div>


                <div className="profile_controllers">
                    <Tooltip className="profile_info_tooltip">
                        <TooltipHeader>
                            <div className="user_coins_wrap">
                                <div
                                    className={`user_coins_img_wrap ${isAddCoins ? "add" : ""} ${isDecCoins ? "dec" : ""}`}>
                                    <img src="/images/icons/coin.webp" alt="coin"/>
                                </div>
                                <span>{new Intl.NumberFormat("en-US", {
                                    useGrouping: true,
                                    groupingSeparator: ' ',
                                }).format(authUser.coins)}</span>
                            </div>
                        </TooltipHeader>
                        <TooltipContent>
                            <div className="user_coins_tooltip">
                                <div className="user_coins_tooltip__wrap">
                                    <img src="/images/coins.webp" alt="coins"/>
                                    <div className="user_coins_tooltip__title">- coins</div>
                                </div>
                                <p>
                                    Это валюта сайта. Зарабатывайте, отвечая на вопросы, и покупайте за них товары
                                    в <Link
                                    to="/shop">магазине</Link>
                                </p>
                            </div>
                        </TooltipContent>
                    </Tooltip>

                    <Dropdown>
                        <DropHeader>
                            <div className="user_btn">
                                <div className="user_btn__wrap">
                                    <span className="user_name">{authUser?.name}</span>
                                    {
                                        <div className="avatar_wrap">
                                            {
                                                authUser?.avatar ?
                                                    <img src={import.meta.env.VITE_BACKEND_URL + authUser.avatar} alt="user"/>
                                                    :
                                                    <img src="/images/user-default.svg" alt="user"/>
                                            }
                                        </div>
                                    }
                                </div>
                            </div>
                        </DropHeader>

                        <DropContent>
                            <DropItem>
                                <Link to="/me">
                                    <img src="/images/icons/profile.svg" alt="profile icon"/>
                                    <span>Профиль</span>
                                </Link>
                            </DropItem>
                            <DropItem>
                                <div onClick={logoutHandler}>
                                    <img src="/images/icons/exit.svg" alt="exit icon"/>
                                    <span>Выйти</span>
                                </div>
                            </DropItem>
                        </DropContent>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
};

export default UserBar;