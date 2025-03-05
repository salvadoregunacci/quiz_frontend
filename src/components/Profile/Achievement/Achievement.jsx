import "./styles.scss";
const Achievement = ({title, imgUrl}) => {
    return (
        <div className="achievement">
            <img src={import.meta.env.VITE_BACKEND_URL + imgUrl} alt="icon" className="achievement_img"/>
            <div className="achievement_title">{title}</div>
        </div>
    );
};

export default Achievement;