
const BorderButton = ({children, className, type, ...props}) => {
    const dataType = {"data-type" : type};

    return (
        <button className={`btn_default border_btn ${className ? className : ""}`}  {...dataType} {...props}>
            {children}
        </button>
    );
};

export default BorderButton;