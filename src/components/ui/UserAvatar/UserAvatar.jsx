const UserAvatar = ({avatarUrl, size = "sm"}) => {
    return (
        <div className={`user_avatar ${size} ${avatarUrl ? "" : "user_avatar_default"}`}>
            <img src={avatarUrl ? import.meta.env.VITE_BACKEND_URL + avatarUrl : "/images/user-default.svg"} alt="user icon"/>
        </div>
    );
};

export default UserAvatar;