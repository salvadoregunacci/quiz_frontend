import {useContext} from "react"
import {DropContext} from "./Dropdown.jsx";

const DropHeader = ({children}) => {
    const {setActive} = useContext(DropContext);

    return (
        <div onClick={()=> {setActive(prev => !prev)}}>
            {children}
        </div>
    );
};

export default DropHeader;