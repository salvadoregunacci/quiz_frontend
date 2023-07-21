import "./styles.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllUsers} from "../../redux/slices/userSlice.js";
import Loader from "../ui/Loader/Loader.jsx";
import RatingItem from "./RatingItem/RatingItem.jsx";
const Rating = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.auth.allUsers);
    const status = useSelector(state => state.auth.status);

    useEffect(()=> {
        dispatch(getAllUsers({sort: "rating", limit: 10}));
    }, []);

    return (
        <div className="rating">
            {
                status === "complete" && users.length ?
                    <div className="container">
                        <div className="rating__content">
                            <h2 className="rating__content_title">
                                Топ-10 пользователей:
                            </h2>

                            <div className="rating__items">
                                {
                                    users.map((item, key) => (
                                        <RatingItem
                                            key={key}
                                            name={item.name}
                                            avatar={item.avatar}
                                            rating={item.rating}
                                            itemId={key}
                                            userId={item.id}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    : <Loader/>
            }
        </div>
    );
};

export default Rating;