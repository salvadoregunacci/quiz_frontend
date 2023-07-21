import "./styles.scss";
import {createContext, useCallback, useEffect, useState} from "react";

export const DropContext = createContext({});
const Dropdown = ({children}) => {
    const [active, setActive] = useState(false);

    const winClickHandler = useCallback((e)=> {
        const parent = e.target.closest(".dropdown_wrap");

        if (parent) return;

        setActive(false);
    }, []);

    useEffect(()=> {
        if (active) {
            window.addEventListener("click", winClickHandler);
        } else {
            window.removeEventListener("click", winClickHandler);
        }
    }, [active]);

    return (
        <DropContext.Provider value={{
            active,
            setActive
        }}>
            <div className="dropdown_wrap">
                {children}
            </div>
        </DropContext.Provider>
    );
};

export default Dropdown;