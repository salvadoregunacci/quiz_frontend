import MenuItem from "./MenuItem/MenuItem.jsx";
import "./styles.scss";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCats, setActiveCat} from "../../redux/slices/categorySlice.js";
import Loader from "../ui/Loader/Loader.jsx";
import {useLocation} from "react-router-dom";
import {resetQuiz} from "../../redux/slices/generalSlice.js";
import {resetAddCoins, resetNewAchievement, resetUnlockCat} from "../../redux/slices/userSlice.js";
import Modal from "../Modal/Modal.jsx";
import Button from "../ui/Button/Button.jsx";

const Menu = () => {
    let sortCats;
    const cats = useSelector(state => state.cats.categories);
    const unlockCats = useSelector(state => state.auth.unlockCategories);
    const status = useSelector(state => state.cats.status);
    const authUser = useSelector(state => state.auth.authUser);
    const dispatch = useDispatch();
    const location = useLocation();
    const isNewAchievement = useSelector(state => state.auth.isNewAchievement);
    const isUnlockCat = useSelector(state => state.auth.isUnlockCat);
    const lastNewCat = unlockCats.length ? unlockCats[unlockCats.length - 1] : null;

    if (cats) {
        sortCats = [...cats.filter(cat => cat["private"] === false)];

        if (authUser) {
           sortCats = [...sortCats, ...cats.filter(cat => cat["private"] === true)];
        }
    }

    if (isNewAchievement) {
        setTimeout(() => {
            dispatch(resetNewAchievement());
        }, 5200);
    }

    document.body.classList.remove("scroll");
    window.scrollTo(0, 0);

    useEffect(() => {
        dispatch(fetchCats());
        dispatch(resetAddCoins());
    }, [dispatch]);

    useEffect(() => {
        dispatch(resetQuiz());
    }, [location.pathname]);

    function selectCategory(e) {
        const parent = e.target.closest("a");
        const selectID = parent.getAttribute("data-id");

        if (selectID) {
            dispatch(setActiveCat(selectID));
        } else {
            dispatch(setActiveCat(cats[0]["id"]));
        }
    }

    function getStatusCat(cat) {
        const curCat = authUser?.completeCategories?.find(item => item.cat === cat.id);

        if (curCat) {
            if (curCat.bestResult === 10) {
                return "complete";
            } else {
                return curCat.bestResult + "/10";
            }
        }

        return "incomplete";
    }

    function closeNewCatModal() {
        dispatch(resetUnlockCat());
    }

    return (
        <div className="container container_hidden">
            <div className="menu">

                <Modal isVisible={isUnlockCat} closeCallback={closeNewCatModal}>
                    <div className="new_cat_modal">
                        <h4 className="new_cat_modal__title">Вы открыли новую категорию:</h4>
                        <img src={lastNewCat?.preview} alt="" className="new_cat_modal__img" />
                        <div className="new_cat_modal__name">{lastNewCat?.title}</div>

                        <Button type="success" className="new_cat_modal__btn">Продолжить</Button>
                    </div>
                </Modal>

                <div className="menu_title">Выберите категорию:</div>

                <div className="menu_items">
                    {
                        status === "loading" ?
                            <Loader/>
                            :
                            sortCats.map(cat => (
                                <MenuItem
                                    key={cat.id}
                                    data-id={cat.id}
                                    toPath="/quiz"
                                    previewUrl={cat.preview}
                                    title={cat.title}
                                    onClick={selectCategory}
                                    status={getStatusCat(cat)}
                                    isPrivate={cat["private"] && !unlockCats.find(uCat => uCat.id === cat.id)}
                                />
                            ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Menu;