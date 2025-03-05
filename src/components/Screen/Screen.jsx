import "./styles.scss";

const Screen = ({children, id, isVisible, isChecked}) => {
    return (
        <div id={id} className={"screen" + (isVisible ? " active" : "") + (isChecked ? " checked" : "")}>
            <div className="content">
                {children}
            </div>
        </div>
    );
};

export default Screen;