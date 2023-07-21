import {useContext} from "react";
import {DropContext} from "./Dropdown.jsx";

const DropContent = ({children}) => {
    const {active} = useContext(DropContext);

    return (
        <ul className={`dropdown ${active ? "active" : ""}`}>
            {children}
        </ul>
    );
};

export default DropContent;