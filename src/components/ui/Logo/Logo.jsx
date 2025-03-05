import {Link} from "react-router-dom";

const Logo = ({mode = "light", size = "sm"}) => {
    return (
        <Link to="/" className={`logo ${mode} ${size}`}>
            <div><span>Q</span>uize</div>
        </Link>
    );
};

export default Logo;