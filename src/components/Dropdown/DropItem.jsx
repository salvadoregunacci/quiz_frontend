import {useContext} from "react";
import {DropContext} from "./Dropdown.jsx";

const DropItem = ({children}) => {
    const {setActive} = useContext(DropContext);

    return (
        <li onClick={()=> setActive(prev => !prev)}>
            {children}
        </li>
    );
};

export default DropItem;