import {useContext} from "react"
import {TooltipContext} from "./Tooltip.jsx";
import "./styles.scss";

const TooltipHeader = ({children}) => {
    const {setVisible} = useContext(TooltipContext);
    let actualMouseOver = false;
    let clickOpen = false;

    function mouseEnterHandler() {
        actualMouseOver = true;

        if (clickOpen) return;

        setTimeout(()=> {
            if (actualMouseOver) {
                setVisible(true);
            }
        }, 600);
    }

    function mouseLeaveHandler() {
        actualMouseOver = false;
    }

    function clickHeaderHandler() {
        clickOpen = true;
        setVisible(prev => !prev);
    }

    return (
        <div className="tooltip__header" onMouseEnter={mouseEnterHandler} onClick={clickHeaderHandler} onMouseLeave={mouseLeaveHandler}>
            {children}
        </div>
    );
};

export default TooltipHeader;