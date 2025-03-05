import './App.scss'
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import Menu from "./components/Menu/Menu.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Header from "./components/Header/Header.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchChangeCoins, fetchGetUnlockCats,
    fetchMe,
    fetchNewAchievements,
    unlockNewCat
} from "./redux/slices/userSlice.js";
import Profile from "./components/Profile/Profile.jsx";
import NewAchievement from "./components/NewAchievement/NewAchievement.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import Shop from "./components/Shop/Shop.jsx";
import AdminBar from "./components/_Admin/AdminBar/AdminBar.jsx";
import Rating from "./components/Rating/Rating.jsx";

import {Navigation, Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide, useSwiper} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from "./components/ui/Button/Button.jsx";
import Logo from "./components/ui/Logo/Logo.jsx";

function App() {
    const authUser = useSelector(state => state.auth.authUser);
    const isNewAchievement = useSelector(state => state.auth.isNewAchievement);
    const correctAnswersCount = useSelector(state => state.general.correctAnswersCount);
    const userItems = useSelector(state => state.auth.authUser?.items);
    const activeCat = useSelector(state => state.cats.activeCatId);
    const dispatch = useDispatch();
    const isUnlockCat = useSelector(state => state.auth.isUnlockCat);
    const isCompleteManual = window.localStorage.getItem("complete_manual");
    const [showManual, setShowManual] = useState(true);
    const closeKeyHandler = useCallback((e)=> {
        if (e.code === "Escape" && showManual) {
            window.removeEventListener("keydown", closeKeyHandler);
            completeManual();
        }
    }, []);

    useEffect(()=> {
        window.addEventListener("keydown", closeKeyHandler);
    }, []);

    useEffect(() => {
        if (authUser) {
            dispatch(fetchGetUnlockCats());
        }
    }, [isUnlockCat]);

    useEffect(() => {
        dispatch(fetchMe());
    }, [dispatch]);

    useEffect(() => {
        if (authUser) {

            // Купить первого питомца
            if (userItems && userItems.length === 1 && !authUser.achievements.includes("64b13457875e83e4c31dedda")) {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64b13457875e83e4c31dedda"));
            }

            // Купить троих питомцев
            if (userItems && userItems.length === 3 && !authUser.achievements.includes("64b576cbb8b0117811e4adb7")) {
                dispatch(fetchChangeCoins({value: 150, method: "+"}));
                dispatch(fetchNewAchievements("64b576cbb8b0117811e4adb7"));
            }

            // Выполнить 1 квиз
            if (authUser?.completeCategories.length === 1 && !authUser.achievements.includes("64ac4b11a8a3fafdf2dd976f")) {
                dispatch(fetchChangeCoins({value: 10, method: "+"}));
                dispatch(fetchNewAchievements("64ac4b11a8a3fafdf2dd976f"));
            }

            // Выполнить 3 квиза
            if (authUser?.completeCategories.length === 3 && !authUser.achievements.includes("64ae8336e7484a06fed705ae")) {
                dispatch(fetchChangeCoins({value: 20, method: "+"}));
                dispatch(fetchNewAchievements("64ae8336e7484a06fed705ae"));
            }

            // Выполнить 5 квизов
            if (authUser?.completeCategories.length === 5 && !authUser.achievements.includes("64afbc3037d7175667c3f246")) {
                dispatch(fetchChangeCoins({value: 30, method: "+"}));
                dispatch(fetchNewAchievements("64afbc3037d7175667c3f246"));
            }

            // Выполнить квиз на тему "ВЕБ-РАЗРАБОТКА"
            if (authUser?.completeCategories.find(item => item.cat === "64a689a6a989019c682eff12") && correctAnswersCount === 10 && !authUser.achievements.includes("64ada87d98a266b18eeabfc1") && activeCat === "64a689a6a989019c682eff12") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64ada87d98a266b18eeabfc1"));
            }

            // Выполнить квиз на тему "РАЗРАБОТКА ИГР"
            if (authUser?.completeCategories.find(item => item.cat === "64a695a3d7baf415d7c30368") && correctAnswersCount === 10 && !authUser.achievements.includes("64adab2d98a266b18eeabfc4") && activeCat === "64a695a3d7baf415d7c30368") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64adab2d98a266b18eeabfc4"));
            }

            // Выполнить квиз на тему "RISE OF EMPIRE"
            if (authUser?.completeCategories.find(item => item.cat === "64ad7bf7661590d74bded3c3") && correctAnswersCount === 10 && !authUser.achievements.includes("64adae2598a266b18eeabfc8") && activeCat === "64ad7bf7661590d74bded3c3") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64adae2598a266b18eeabfc8"));
            }

            // Выполнить квиз на тему "МАНИКЮР"
            if (authUser?.completeCategories.find(item => item.cat === "64ad81f6661590d74bded452") && correctAnswersCount === 10 && !authUser.achievements.includes("64ad87d698a266b18eeabfbc") && activeCat === "64ad81f6661590d74bded452") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64ad87d698a266b18eeabfbc"));
            }

            // Выполнить квиз на тему "3d МОДЕЛИРОВАНИЕ"
            if (authUser?.completeCategories.find(item => item.cat === "64ae7c9fad3387121424a967") && correctAnswersCount === 10 && !authUser.achievements.includes("64ae7b4ee7484a06fed705a9") && activeCat === "64ae7c9fad3387121424a967") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64ae7b4ee7484a06fed705a9"));
            }

            // Выполнить квиз на тему "ФИЛЬМЫ"
            if (authUser?.completeCategories.find(item => item.cat === "64aea0efc5879f6d49391204") && correctAnswersCount === 10 && !authUser.achievements.includes("64aea031e7484a06fed705b9") && activeCat === "64aea0efc5879f6d49391204") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64aea031e7484a06fed705b9"));
            }

            // Выполнить квиз на тему "BREAKING BAD"
            if (authUser?.completeCategories.find(item => item.cat === "64aefeebc5879f6d493916f8") && correctAnswersCount === 10 && !authUser.achievements.includes("64af0718e7484a06fed705c2") && activeCat === "64aefeebc5879f6d493916f8") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64af0718e7484a06fed705c2"));
            }

            // Выполнить квиз на тему "РЭП"
            if (authUser?.completeCategories.find(item => item.cat === "64afab1b5a852bb98d2afecc") && correctAnswersCount === 10 && !authUser.achievements.includes("64afabcb37d7175667c3f241") && activeCat === "64afab1b5a852bb98d2afecc") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64afabcb37d7175667c3f241"));
            }

            // Выполнить квиз на тему "ДИЗАЙН"
            if (authUser?.completeCategories.find(item => item.cat === "64afb9545a852bb98d2b00a5") && correctAnswersCount === 10 && !authUser.achievements.includes("64afbd1637d7175667c3f247") && activeCat === "64afb9545a852bb98d2b00a5") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64afbd1637d7175667c3f247"));
            }

            // Выполнить квиз на тему "ГЕОГРАФИЯ"
            if (authUser?.completeCategories.find(item => item.cat === "64afc8025a852bb98d2b0300") && correctAnswersCount === 10 && !authUser.achievements.includes("64afcc8c37d7175667c3f24c") && activeCat === "64afc8025a852bb98d2b0300") {
                dispatch(fetchChangeCoins({value: 25, method: "+"}));
                dispatch(fetchNewAchievements("64afcc8c37d7175667c3f24c"));
            }

            // Выполнить квиз на тему "ДЕНЬГИ"
            if (authUser?.completeCategories.find(item => item.cat === "64b3c6e7777d0afb3a3abf93") && correctAnswersCount === 10 && !authUser.achievements.includes("64b5615bb8b0117811e4adae") && activeCat === "64b3c6e7777d0afb3a3abf93") {
                dispatch(fetchChangeCoins({value: 100, method: "+"}));
                dispatch(fetchNewAchievements("64b5615bb8b0117811e4adae"));
            }

            // Выполнить квиз на тему "WORLD OF TANKS"
            if (authUser?.completeCategories.find(item => item.cat === "64b51bc99f176c3c8535b575") && correctAnswersCount === 10 && !authUser.achievements.includes("64b562aab8b0117811e4adb1") && activeCat === "64b51bc99f176c3c8535b575") {
                dispatch(fetchChangeCoins({value: 100, method: "+"}));
                dispatch(fetchNewAchievements("64b562aab8b0117811e4adb1"));
            }

            // Выполнить квиз на тему "КОМПЬЮТЕР"
            if (authUser?.completeCategories.find(item => item.cat === "64b52d149f176c3c8535b991") && correctAnswersCount === 10 && !authUser.achievements.includes("64b569bdb8b0117811e4adb4") && activeCat === "64b52d149f176c3c8535b991") {
                dispatch(fetchChangeCoins({value: 100, method: "+"}));
                dispatch(fetchNewAchievements("64b569bdb8b0117811e4adb4"));
            }

            // ======================================

            if (authUser?.completeCategories.length) {
                const completeCatsCount = authUser?.completeCategories.length;
                const bestResultCats = authUser?.completeCategories.filter(item => item.bestResult === 10).length;

                // Открыть категорию "ДЕНЬГИ"
                if (completeCatsCount >= 3 && bestResultCats >= 3 && !authUser.unlockCategories.includes("64b3c6e7777d0afb3a3abf93")) {
                    dispatch(unlockNewCat({
                        unlockCategory: "64b3c6e7777d0afb3a3abf93"
                    }));
                }

                // Открыть категорию "WORLD OF TANKS"
                if (completeCatsCount >= 6 && bestResultCats >= 6 && !authUser.unlockCategories.includes("64b51bc99f176c3c8535b575")) {
                    dispatch(unlockNewCat({
                        unlockCategory: "64b51bc99f176c3c8535b575"
                    }));
                }

                // Открыть категорию "КОМПЬЮТЕР"
                if (completeCatsCount >= 9 && bestResultCats >= 9 && !authUser.unlockCategories.includes("64b52d149f176c3c8535b991")) {
                    dispatch(unlockNewCat({
                        unlockCategory: "64b52d149f176c3c8535b991"
                    }));
                }
            }
        }
    }, [authUser]);

    function completeManual() {
        setShowManual(false);
        window.localStorage.setItem("complete_manual", "1");
    }

    const NextButton = ({className}) => {
        const swiper = useSwiper();

        return (
            <Button onClick={() => swiper?.slideNext()}
                    className={`manual_slider__next_btn ${className ? className : ""}`}>Далее</Button>
        );
    }

    return (<>
        <BrowserRouter>
            <Header/>
            <NewAchievement active={isNewAchievement}/>

            {
                authUser && authUser.role === "ADMIN" &&
                <AdminBar/>
            }

            {
                !isCompleteManual && !authUser && showManual &&
                <div className="manual_slider__wrap">
                    <div className="manual_slider__close_btn" onClick={completeManual}>
                        <svg width="28" height="28" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.16998 13.83L13.83 8.17004" stroke="red" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M13.83 13.83L8.16998 8.17004" stroke="red" strokeWidth="1.5"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 21H14C19 21 21 19 21 14V8C21 3 19 1 14 1H8C3 1 1 3 1 8V14C1 19 3 21 8 21Z"
                                  stroke="red" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        className="manual_slider"
                        slidesPerView={1}
                        pagination={{clickable: true}}
                        allowTouchMove={false}
                        speed={600}
                    >
                        <SwiperSlide>
                            <div className="manual_item">
                                <div className="manual_item__title">Добро пожаловать в</div>
                                <Logo mode="dark" size="md"/>
                                <img src="/images/hello.webp" alt="hello" className="manual__img"/>
                                <div className="manual__txt gold bold">
                                    Quiz - это викторина, в которой Вы отвечаете на
                                    вопросы из разных категорий
                                </div>
                                <NextButton/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="manual_item">
                                <div className="manual_item__title">Соревнуйтесь</div>
                                <img src="/images/competition.webp" alt="competition" className="manual__img"/>
                                <div className="manual__txt gold bold">
                                    Увеличивайте свой рейтинг, проходя категории, получайте достижения, и занимайте
                                    первые места в турнирной
                                    таблице
                                </div>
                                <NextButton/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="manual_item">
                                <div className="manual_item__title">Прокачивайтесь</div>
                                <img src="/images/moneys.webp" alt="moneys" className="manual__img"/>
                                <div className="manual__txt gold bold">
                                    За каждый правильный ответ, Вы получаете монеты — coins.
                                    С их помощью, можно приобретать товары в Магазине.
                                </div>
                                <NextButton/>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="manual_item">
                                <div className="manual_item__title">С чего начать?</div>
                                <img src="/images/new_user.webp" alt="new user" className="manual__img"/>
                                <div className="manual__txt gold bold">
                                    Для начала, давайте создадим аккаунт, чтобы получить доступ ко всем возможностям
                                </div>

                                <Link to="/register" className="manual_slider__next_btn" onClick={completeManual}>
                                    <Button>Регистрация</Button>
                                </Link>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            }

            <Routes>
                <Route path="/" element={<Menu/>}/>
                <Route path="/quiz" element={
                    <PrivateRoute privateRule={Boolean(activeCat !== null)}>
                        <Dashboard/>
                    </PrivateRoute>
                }/>
                <Route path="/login" element={
                    <PrivateRoute privateRule={!window.localStorage.getItem("token")}>
                        <Login/>
                    </PrivateRoute>
                }/>
                <Route path="/register" element={
                    <PrivateRoute privateRule={!window.localStorage.getItem("token")}>
                        <Register/>
                    </PrivateRoute>
                }/>
                <Route path="/me" element={
                    <PrivateRoute privateRule={authUser}>
                        <Profile/>
                    </PrivateRoute>
                }/>
                <Route path="/shop" element={
                    <PrivateRoute privateRule={authUser}>
                        <Shop/>
                    </PrivateRoute>
                }/>
                <Route path="/rating" element={
                    <PrivateRoute privateRule={authUser}>
                        <Rating/>
                    </PrivateRoute>
                }/>
                <Route path="*" element={
                    <h2>404 not found</h2>
                }/>
            </Routes>
        </BrowserRouter>
    </>)
}

export default App
