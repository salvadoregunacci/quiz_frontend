import "../styles.scss";
import UserAvatar from "../../ui/UserAvatar/UserAvatar.jsx";
import {useSelector} from "react-redux";

const RatingItem = ({name, avatar, rating, itemId, userId}) => {
    const {id:curUserId} = useSelector(state => state.auth.authUser);

    return (
        <div className={`rating__item ${curUserId === userId ? "you" : ""}`} data-count={itemId + 1}>
            <div className="rating__item_count">{itemId + 1}</div>
            <div className="rating__item_content">
                <UserAvatar avatarUrl={avatar} size="md"/>
                <div className="rating__item_wrap">
                    <div className="rating__item_name">{name}</div>
                    <div className="rating__item_total_wrap">
                        <div className="rating__item_total">{new Intl.NumberFormat().format(rating)}</div>
                        <img src="/images/icons/star.svg" alt="star"/>
                    </div>
                </div>
                {
                    itemId === 0 || itemId === 1 || itemId === 2 ?
                        <img src={`/images/medal_${itemId + 1}.webp`} alt="medal" className="rating__item_medal"/>
                        : ""
                }
            </div>
        </div>
    );
};

export default RatingItem;