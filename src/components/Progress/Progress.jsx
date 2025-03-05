import {useSelector} from "react-redux";
import "./styles.scss";

const Progress = () => {
    const countSteps = useSelector(state => state.general.countSteps);
    const activeStep = useSelector(state => state.general.activeStep);

    return (
        <div className="progress">
            {
                (Array(countSteps).fill("")).map((item, key) => (
                    <div key={key} className={"step_item" + ((key + 1) === activeStep ? " active" : "")}></div>
                ))
            }
        </div>
    );
};

export default Progress;