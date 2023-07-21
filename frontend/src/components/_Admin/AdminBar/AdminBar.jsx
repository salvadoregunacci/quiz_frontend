import "./styles.scss";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {fetchChangeCoins} from "../../../redux/slices/userSlice.js";

const AdminBar = () => {
    const dispatch = useDispatch();
    const [visible, setVisible] = useState(false);

    function _clickHandler() {
        setVisible(prev => !prev);
    }

    function _addMoney() {
        dispatch(fetchChangeCoins({value: 2000, method: "+"}));
    }

    return (
        <div className={`admin_bar ${visible ? "active" : ""}`}>
            <div className="admin_bar__header" onClick={_clickHandler}>
                <img src="/images/icons/admin_header.webp" alt="admin" className="admin_bar__handler_img" />
            </div>
            <div className="admin_bar__content">
                <div className="admin_bar__item admin_bar__item_1" title="Добавить 2000 монет" onClick={_addMoney}>
                    <img src="/images/coins.webp" alt="coins"/>
                </div>
            </div>
        </div>
    );
};

export default AdminBar;