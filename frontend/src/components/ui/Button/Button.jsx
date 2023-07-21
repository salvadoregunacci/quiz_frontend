
const Button = ({children, className, type, ...props}) => {
    const dataType = {"data-type" : type};

    return (
        <button className={"btn_default btn" + " " + (className ? className : "")} {...dataType} {...props}>
            {children}
        </button>
    );
};

export default Button;