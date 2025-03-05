const MyPet = ({title, preview}) => {
    return (
        <div className="pet_card">
            <img src={import.meta.env.VITE_BACKEND_URL + preview} alt="" className="pet_card__img" />
            <div className="pet_card__title">{title}</div>
        </div>
    );
};

export default MyPet;