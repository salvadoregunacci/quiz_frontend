import "./styles.scss";

const TooltipContent = ({children}) => {
    return (
        <div className="tooltip__content_wrap">
            <div className="tooltip__content">
                {children}
            </div>
        </div>
    );
};

export default TooltipContent;