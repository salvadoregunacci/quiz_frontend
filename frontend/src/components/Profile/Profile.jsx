import {useDispatch, useSelector} from "react-redux";
import "./styles.scss";
import BorderButton from "../ui/BorderButton/BorderButton.jsx";
import {useEffect, useRef, useState} from "react";
import {
    fetchGetAchievements,
    fetchGetUserItems,
    fetchMe,
    logOut,
    resetAccount,
    updateAvatar
} from "../../redux/slices/userSlice.js";
import Loader from "../ui/Loader/Loader.jsx";
import Modal from "../Modal/Modal.jsx";
import Achievement from "./Achievement/Achievement.jsx";
import Tooltip from "../Tooltip/Tooltip.jsx";
import TooltipHeader from "../Tooltip/TooltipHeader.jsx";
import TooltipContent from "../Tooltip/TooltipContent.jsx";
import {Link, useNavigate} from "react-router-dom";
import MyPet from "./MyPet/MyPet.jsx";
import {randomInt} from "../../utils.js";

const Profile = () => {
    const dispatch = useDispatch();
    const achievements = useSelector(state => state.auth.achievements);
    const items = useSelector(state => state.auth.items);
    const authUser = useSelector(state => state.auth.authUser);
    const [visibleModal, setVisibleModal] = useState(false);
    const [visibleResetModal, setVisibleResetModal] = useState(false);
    const navigate = useNavigate();
    const loadImgRef = useRef(null);
    const previewImgRef = useRef(null);
    const loadImgFormRef = useRef(null);
    const [isLoadNewAvatar, setIsLoadNewAvatar] = useState(false);

    useEffect(() => {
        loadImgRef.current.addEventListener("change", loadNewAvatar);
    }, []);

    useEffect(() => {
        dispatch(fetchGetAchievements(authUser));
        dispatch(fetchGetUserItems());
    }, [dispatch]);

    function loadNewAvatar(e) {
        const _loadFile = e.target.files[0];

        if (_loadFile) {
            setIsLoadNewAvatar(true);
            const reader = new FileReader();
            reader.readAsDataURL(_loadFile);

            reader.onload = function () {
                previewImgRef.current.src = reader.result;
            }
        }
    }

    function saveNewAvatarHandler(e) {
        e.preventDefault();

        if (loadImgFormRef.current) {
            const formData = new FormData();

            setIsLoadNewAvatar(false);
            formData.append('avatar', loadImgRef.current.files[0]);

            dispatch(updateAvatar(formData));
        }
    }

    function logoutHandler() {
        setVisibleModal(true);
    }

    function closeHandler() {
        setVisibleModal(false);
        setVisibleResetModal(false);
    }

    function confirmLogoutHandler() {
        dispatch(logOut());
    }

    function confirmResetAccountHandler() {
        dispatch(resetAccount());
        navigate("/");
    }

    useEffect(() => {
        dispatch(fetchMe());
    }, [dispatch]);

    return (
        <div className="container">
            <div className="profile">
                {
                    authUser ?
                        <div className="container">
                            {/* Выход из аккаунта */}
                            <Modal isVisible={visibleModal} closeCallback={closeHandler}>
                                <div className="confirm_logout">
                                    <h3>Выйти из аккаунта?</h3>

                                    <div className="confirm_logout__wrap">
                                        <BorderButton type="danger" onClick={confirmLogoutHandler}>Да</BorderButton>
                                        <BorderButton type="success" onClick={closeHandler}>Нет</BorderButton>
                                    </div>
                                </div>
                            </Modal>

                            {/* Сброс аккаунта */}
                            <Modal isVisible={visibleResetModal} closeCallback={closeHandler}>
                                <div className="confirm_reset_account">
                                    <img src="/images/reset_account.webp" alt="reset icon"
                                         className="confirm_reset_account__img"/>
                                    <h3>Вы уверены что хотите сбросить весь прогресс?</h3>
                                    <p>
                                        Ваши достижения, монеты, пройденные этапы, и приобретенные товары будут сброшены
                                        до начальных значений, вы не сможете вернуться назад
                                    </p>
                                    <div className="confirm_logout__wrap">
                                        <BorderButton type="danger"
                                                      onClick={confirmResetAccountHandler}>Да</BorderButton>
                                        <BorderButton type="success" onClick={closeHandler}>Нет</BorderButton>
                                    </div>
                                </div>
                            </Modal>

                            <div className="profile_sidebar">
                                <div className="profile_sidebar__info">
                                    <div className="profile_sidebar__info_row">
                                        <form ref={loadImgFormRef} method="PATCH"
                                              className={`profile_img_form ${isLoadNewAvatar ? "active" : ""}`}
                                              encType="multipart/form-data">
                                            <div className="profile_img_form__wrap">
                                                <img
                                                    src={authUser["avatar"] ? authUser["avatar"] : "/public/images/user-default.svg"}
                                                    className={`profile_img ${authUser["avatar"] ? "" : "default_img"}`}
                                                    alt="avatar" ref={previewImgRef}/>

                                                <label htmlFor="profile_img_form__input"
                                                       className="profile_img_form__label">
                                                    <svg width="20" height="18.89" viewBox="0 0 27 26" fill="none"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M13.5 19.0556C15.8012 19.0556 17.6667 17.1901 17.6667 14.8889C17.6667 12.5877 15.8012 10.7222 13.5 10.7222C11.1988 10.7222 9.33333 12.5877 9.33333 14.8889C9.33333 17.1901 11.1988 19.0556 13.5 19.0556Z"
                                                            stroke="black" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                        <path
                                                            d="M13.5 2.38892H10.7222C10.3539 2.38892 10.0006 2.53525 9.74013 2.79571C9.47966 3.05618 9.33333 3.40945 9.33333 3.7778C9.33333 4.51452 9.04067 5.22106 8.51974 5.74199C7.99881 6.26292 7.29227 6.55558 6.55556 6.55558H3.77778C3.04107 6.55558 2.33453 6.84824 1.81359 7.36917C1.29266 7.89011 1 8.59665 1 9.33336V21.8334C1 22.5701 1.29266 23.2766 1.81359 23.7975C2.33453 24.3185 3.04107 24.6111 3.77778 24.6111H23.2222C23.9589 24.6111 24.6655 24.3185 25.1864 23.7975C25.7073 23.2766 26 22.5701 26 21.8334V12.1111"
                                                            stroke="black" strokeWidth="2" strokeLinecap="round"
                                                            strokeLinejoin="round"/>
                                                        <path d="M17.6667 5.16669H26" stroke="black" strokeWidth="2"
                                                              strokeLinecap="round" strokeLinejoin="round"/>
                                                        <path d="M21.8333 1V9.33333" stroke="black" strokeWidth="2"
                                                              strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </label>
                                                <input name="avatar" ref={loadImgRef} id="profile_img_form__input"
                                                       type="file"
                                                       accept="image/jpeg, image/png, image/webp, image/jpg"/>
                                            </div>
                                            <button className="profile_img_form__btn"
                                                    onClick={saveNewAvatarHandler}>Сохранить
                                            </button>
                                        </form>
                                        <div className="profile_user__info">
                                            <div className="profile_username">{authUser["name"]}</div>
                                            <div className="profile_email">{authUser["email"]}</div>
                                        </div>
                                    </div>

                                    <div className="profile_rating_wrap">
                                        <img src="/images/rating_cup.webp" alt="winner"
                                             className="profile_rating__img"/>
                                        <div className="profile_rating_row">
                                            <div className="profile_rating__subtitle">Общий рейтинг:</div>
                                            <div className="profile_rating__title">{authUser["rating"]}</div>
                                        </div>

                                    </div>
                                </div>

                                <div className="profile_controll_buttons">
                                    <BorderButton className="profile_logout_btn" type="warning" onClick={
                                        () => setVisibleResetModal(true)
                                    }>
                                        Сбросить прогресс
                                    </BorderButton>

                                    <BorderButton className="profile_logout_btn" type="danger" onClick={logoutHandler}>
                                        Выход
                                    </BorderButton>
                                </div>

                            </div>

                            <div className="profile_content">
                                <div className="profile_block profile_block__balance">
                                    <h3 className="profile__title">Баланс:</h3>
                                    <div className="profile_wrap profile_balance_wrap">
                                        <div className="profile_balance_row">
                                            <img src="/images/coins.webp" alt="coins"/>
                                            <div className="profile_balance">
                                                {new Intl.NumberFormat("en-US", {
                                                    useGrouping: true,
                                                    groupingSeparator: ' ',
                                                }).format(authUser.coins)}
                                                <span>coins</span>
                                            </div>
                                        </div>
                                        <div className="profile_balance_info">
                                            <Tooltip>
                                                <TooltipHeader>
                                                    <img className="profile_info_icon" src="/images/icons/info.webp"
                                                         alt="info"/>
                                                </TooltipHeader>
                                                <TooltipContent>
                                                    Зарабатывайте <b>coins</b>, отвечая на вопросы.
                                                    За них, Вы сможете покупать питомцев в <Link to="/shop">магазине
                                                                                                            сайта</Link>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>

                                <div className="profile_block">
                                    <h3 className="profile__title">Достижения:</h3>
                                    <div className="profile_wrap profile_achievements_wrap">
                                        {
                                            achievements.length ?
                                                achievements.map((item, key) => (
                                                    <Tooltip key={key} className="profile_achievement_tooltip">
                                                        <TooltipHeader>
                                                            <Achievement title={item.title} imgUrl={item.preview}/>
                                                        </TooltipHeader>
                                                        <TooltipContent>
                                                            <p>{item.desc}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ))
                                                :
                                                <div className="profile_no_achievements_title profile_no_achievements_title_1">Вы пока не получили ни
                                                                                               одного
                                                                                               достижения</div>
                                        }
                                    </div>
                                </div>

                                <div className="profile_block">
                                    <h3 className="profile__title">Мои питомцы:</h3>
                                    <div className="profile_wrap profile_pets_wrap">
                                        {
                                            items.length ?
                                                items.map((item, key) => (
                                                    <Tooltip key={key}>
                                                        <TooltipHeader>
                                                            <MyPet title={item.title} preview={item.preview}/>
                                                        </TooltipHeader>
                                                        <TooltipContent>
                                                            <p>{item.frazes[randomInt(0, item.frazes.length - 1)]}</p>
                                                        </TooltipContent>
                                                    </Tooltip>
                                                ))
                                                :
                                                <div className="profile_no_achievements_title">
                                                    У вас пока нет ни одного питомца, загляните в <Link
                                                    to="/shop">магазин</Link>
                                                </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <Loader/>
                }
            </div>
        </div>
    );
};

export default Profile;