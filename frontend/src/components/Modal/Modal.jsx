import {useCallback, useEffect, useState} from "react";

const Modal = ({children, isVisible = false, closeCallback}) => {
    const [visible, setVisible] = useState(isVisible);
    const closeHandler = useCallback((e)=> {
        e.stopPropagation();

        if (e.type === "keydown" && e.code !== "Escape") return;

        setVisible(false);

        if (closeCallback) {
            closeCallback();
        }
    }, []);

    useEffect(()=> {
        window.addEventListener("keydown", closeHandler);

        return ()=> {
            window.removeEventListener("keydown", closeHandler);
        }
    }, []);

    useEffect(()=> {
        setVisible(isVisible);
    }, [isVisible]);

    return (
        <div className={`modal ${visible ? "active" : ""}`} onClick={closeHandler}>
            <div className="modal_content">
                {children}
                <button className="modal_close__btn" onClick={closeHandler}>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.321 17.679L17.679 10.321" stroke="#292D32" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.679 17.679L10.321 10.321" stroke="#292D32" strokeWidth="1.5"
                              strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                            d="M10.1 27H17.9C24.4 27 27 24.4 27 17.9V10.1C27 3.6 24.4 1 17.9 1H10.1C3.6 1 1 3.6 1 10.1V17.9C1 24.4 3.6 27 10.1 27Z"
                            stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Modal;