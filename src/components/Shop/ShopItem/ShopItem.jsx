import Button from "../../ui/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {buyItem} from "../../../redux/slices/userSlice.js";
import {useEffect, useState} from "react";

const ShopItem = ({id, title, preview, price, desc, isBuy, setBuyItem, showAlert, setConfirmModal, confirm, ratingBonus}) => {
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.auth.authUser);
    const [buy, setBuy] = useState(isBuy);

    function buyItemHandler() {
        if (checkAllowedBuy()) {
            setConfirmModal(true);
            setBuyItem(id);
        } else {
            showAlert();
        }
    }

    useEffect(()=> {
        if (confirm === id) {
            setBuy(true);
            dispatch(buyItem({id, price, ratingBonus}));
        }
    }, [confirm]);

    function checkAllowedBuy() {
        const odd = authUser.coins - price;
        return odd >= 0;
    }

    return (
        <div className={`shop_item ${buy ? "buy" : ""}`} id={id} title={title}>
            <div className="shop_item__preview">
                <img src={import.meta.env.VITE_BACKEND_URL + preview} alt="shop item"/>
            </div>
            <div className="shop_item__content">
                <div className="shop_item__title">{title}</div>
                <div className="shop_item__row shop_item__price_row">
                    <div className="shop_item__label">Цена:</div>
                    <div className="shop_item__price_wrap">
                        <span className="shop_item__price">{new Intl.NumberFormat("en-US").format(price)}</span>
                        <span className="shop_item__price_val">
                            <img src="/images/icons/coin.webp" alt="coin"/>
                        </span>
                    </div>
                </div>
                <p className="shop_item__desc">{desc}</p>

                <Button onClick={buyItemHandler}>Купить</Button>
            </div>
        </div>
    );
};

export default ShopItem;