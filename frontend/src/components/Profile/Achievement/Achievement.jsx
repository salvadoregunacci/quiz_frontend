import "./styles.scss";
const Achievement = ({title, imgUrl}) => {
    return (
        <div className="achievement">
            <img src={imgUrl} alt="icon" className="achievement_img"/>
            <div className="achievement_title">{title}</div>
        </div>
    );
};

export default Achievement;