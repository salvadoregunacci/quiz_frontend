import {Link} from "react-router-dom";
import "../styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {fetchCompleteCategory} from "../../../redux/slices/userSlice.js";
import {setActiveCat} from "../../../redux/slices/categorySlice.js";
import {_setFullCorrectAnswersCount} from "../../../redux/slices/generalSlice.js";

const MenuItem = ({toPath, previewUrl, title, status, isPrivate, ...props}) => {
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.auth.authUser);

    function _adminClickComplete(e) {
        e.preventDefault();
        e.stopPropagation();

        const parent = e.target.closest(".menu_item");
        const id = parent ? parent.getAttribute("data-id") : "";

        dispatch(setActiveCat(id));
        dispatch(_setFullCorrectAnswersCount());
        dispatch(fetchCompleteCategory({
            id,
            bestResult: 10,
            dataFrom: {
                value: 10 * 10,
                method: "+"
            },
            correctAnswersCount: 10
        }));
    }

    return (
        <Link to={toPath} className={`menu_item ${isPrivate ? "private" : ""}`} {...props}>
            {
                authUser && authUser.role === "ADMIN" && status !== "complete" && isPrivate === false ?
                    <div className="admin_complete_btn" onClick={_adminClickComplete}>Выполнить</div>
                    : ""
            }
            <img src={previewUrl} alt="preview" className="menu_item__img" />
            <img src="/images/icons/lock.webp" alt="preview" className="menu_item__private_img" />
            <div className="menu_item__title">{title}</div>
            {
                status !== "incomplete" ?
                    <div className="menu_item__status">
                        { status === "complete" ?
                            <img src="/images/complete_cup.webp" alt="cup" title="Все вопросы завершены"/>
                            : <div className="menu_item__status_txt" title={`Завершено ${status} вопросов`}>{status}</div>
                        }
                    </div>
                    : ""
            }

        </Link>
    );
};

export default MenuItem;