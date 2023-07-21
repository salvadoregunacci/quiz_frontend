import {useEffect, useRef, useState} from "react";

const Alert = ({children, isVisible, closeCallback, type, hideInterval = 5000}) => {
    const dataType = {"data-type" : type};
    const [visible, setVisible] = useState(isVisible);
    const timeout = useRef(null);

    useEffect(()=> {
        setVisible(isVisible);

        timeout.current = setTimeout(()=> {
            setVisible(false);

            if (closeCallback) {
                closeCallback();
            }
        }, hideInterval);

        return ()=> {
            clearTimeout(timeout.current);
        }
    }, [isVisible]);

    return (
        <div className={`alert_msg ${visible ? "active" : ""}`} {...dataType}>
            <img src={`/images/alert/${type}.webp`} alt="icon" className="alert_msg__icon" />
            {children}
        </div>
    );
};

export default Alert;