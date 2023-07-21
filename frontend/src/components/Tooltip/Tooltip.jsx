import {createContext, useState} from "react"
import "./styles.scss";

export const TooltipContext = createContext();
const Tooltip = ({children, className}) => {
    const [visible, setVisible] = useState(false);

    function mouseLeaveHandler() {
        setVisible(false);
    }

    return (
        <TooltipContext.Provider value={{visible, setVisible}}>
            <div className={`tooltip ${visible ? "active" : ""} ${className ? className : ""}`} onMouseLeave={mouseLeaveHandler}>
                {children}
            </div>
        </TooltipContext.Provider>
    );
};

export default Tooltip;