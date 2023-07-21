const MyPet = ({title, preview}) => {
    return (
        <div className="pet_card">
            <img src={preview} alt="" className="pet_card__img" />
            <div className="pet_card__title">{title}</div>
        </div>
    );
};

export default MyPet;