import "./styles.scss";
const NewAchievement = ({active}) => {
    return (
        <div className={`new_achiev ${active ? "active" : ""}`}>
            <img src="/images/new_achievement.webp" alt="cup"/>
            <span>Получено новое достижение</span>
        </div>
    );
};

export default NewAchievement;