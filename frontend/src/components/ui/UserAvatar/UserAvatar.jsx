const UserAvatar = ({avatarUrl, size = "sm"}) => {
    return (
        <div className={`user_avatar ${size} ${avatarUrl ? "" : "user_avatar_default"}`}>
            <img src={avatarUrl ? avatarUrl : "/images/user-default.svg"} alt="user icon"/>
        </div>
    );
};

export default UserAvatar;