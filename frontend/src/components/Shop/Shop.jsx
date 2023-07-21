import "./styles.scss";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../redux/slices/shopSlice.js";
import ShopItem from "./ShopItem/ShopItem.jsx";
import Modal from "../Modal/Modal.jsx";
import BorderButton from "../ui/BorderButton/BorderButton.jsx";
import {Link} from "react-router-dom";
import {resetAddCoins} from "../../redux/slices/userSlice.js";
import Alert from "../Alert/Alert.jsx";
import Button from "../ui/Button/Button.jsx";

const Shop = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.shop.items);
    const buyItems = useSelector(state => state.auth.authUser.items);
    const [showAlert, setShowAlert] = useState(false);
    const [buyItem, setBuyItem] = useState(null);
    const [isShowBuy, setIsShowBuy] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

    function setBuyItemHandler(id) {
        const bItem = items.find(item => item.id === id);
        setBuyItem(bItem);
        setIsShowBuy(true);

        setTimeout(()=> {
            dispatch(resetAddCoins());
        }, 1000);
    }

    function closeModalHandler() {
        setIsShowBuy(false);
        setBuyItem(null);
    }

    useEffect(() => {
        dispatch(getItems());
    }, []);

    function showAlertHandler() {
        if (showAlert) return;

        setShowAlert(true);
    }

    function confirmBuy() {
        setConfirm(buyItem.id);
        closeConfirmModalHandler();
    }

    function closeConfirmModalHandler() {
        setConfirmModal(false);
    }

    return (
        <div>
            <Alert isVisible={showAlert} type="warning" closeCallback={()=> setShowAlert(false)}>
                Недостаточно монет
            </Alert>

            {
                confirmModal ?
                    <Modal isVisible={true} closeCallback={closeConfirmModalHandler}>
                        <div className="shop_confirm_modal">
                            <div className="shop_confirm_modal__title">Подтвердить покупку <span>{buyItem.title}</span>?</div>
                            <div className="shop_confirm_modal__buttons">
                                <Button type="success" onClick={confirmBuy}>Подтвердить</Button>
                                <BorderButton type="danger" onClick={closeConfirmModalHandler}>Отмена</BorderButton>
                            </div>
                        </div>
                    </Modal>
                    : ""
            }

            {
                isShowBuy && buyItem && confirm === buyItem.id ?
                    <Modal isVisible={isShowBuy} closeCallback={closeModalHandler}>
                        <div className="shop_buy_item">
                            <div className="shop_buy_item__desc">Вы приобрели нового питомца:</div>
                            <div className="shop_buy_item__img">
                                <img src={buyItem.preview} alt="preview" />
                            </div>
                            <div className="shop_buy_item__title">{buyItem.title}</div>

                            <Link to="/me" className="shop_buy_item__btn">
                                <BorderButton>
                                    Перейти в коллекцию
                                </BorderButton>
                            </Link>
                        </div>
                    </Modal>
                    : ""
            }

            <div className="shop">
                <div className="container">
                    <div className="shop_block shop_preview_block">
                        <div className="shop_preview_wrap">
                            <img src="/images/shop.webp" alt="shop"/>
                        </div>
                        <div className="shop_title_wrap">
                            <div className="shop_title">Магазин питомцев</div>
                            <div className="shop_subtitle">
                                Ищите себе друга? <br/>
                                У нас большой выбор домашних животных!
                            </div>
                        </div>
                    </div>

                    <div className="shop_block shop_content">
                        <div className="shop_items">
                            {
                                items ?
                                    items.map((item, key) => (
                                        <ShopItem
                                            key={key}
                                            id={item.id}
                                            title={item.title}
                                            preview={item.preview}
                                            price={item.price}
                                            desc={item.desc}
                                            isBuy={buyItems.includes(item.id)}
                                            setBuyItem={setBuyItemHandler}
                                            showAlert={showAlertHandler}
                                            setConfirmModal={setConfirmModal}
                                            confirm={confirm}
                                            ratingBonus={item.bonus_rating}
                                        />
                                    ))
                                    : <h2>Нет товаров</h2>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;