import {useState} from "react"
import Button from "../ui/Button/Button.jsx";
import "./styles.scss";
import {useDispatch} from "react-redux";
import {completeQuiz} from "../../redux/slices/generalSlice.js";

const Quiz = ({question, answers, id}) => {
    const [showErr, setShowErr] = useState(false);
    const [selectAnswer, setSelectAnswer] = useState(null);
    const dispatch = useDispatch();

    function answerClickHandler() {
        if (selectAnswer === null) {
            setShowErr(true);
            return;
        }

        dispatch(completeQuiz({curQuestionId: id, selectAnswerId: selectAnswer}));
    }

    function changeAnswerHandler(e) {
        const selectId = +e.target.dataset.id;
        setShowErr(false);
        setSelectAnswer(selectId);
    }

    return (
        <div className={"quiz"}>
            <h3>{question}</h3>
            <ul>
                {
                    answers.map((answer, key) => (
                        <li key={key}>
                            <input type="radio" id={`answer${id}${key}`} data-id={key} name="answer"
                                   onChange={changeAnswerHandler}/>
                            <label htmlFor={`answer${id}${key}`}>{answer}</label>
                        </li>
                    ))
                }
            </ul>

            <div className={"err" + (showErr ? " active" : "")}>*Вы не выбрали ответ</div>
            <Button onClick={answerClickHandler}>Ответить</Button>
        </div>
    );
};

export default Quiz;