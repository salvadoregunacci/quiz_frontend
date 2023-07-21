import Screen from "../Screen/Screen.jsx";
import "./styles.scss";
import Button from "../ui/Button/Button.jsx";
import Progress from "../Progress/Progress.jsx";
import {useDispatch, useSelector} from "react-redux";
import Quiz from "../Quiz/Quiz.jsx";
import {useEffect, useState} from "react";
import {fetchQuestions, nextStep} from "../../redux/slices/generalSlice.js";
import {Link} from "react-router-dom";
import Loader from "../ui/Loader/Loader.jsx";
import {fetchCompleteCategory, resetAddCoins, resetNewAchievement} from "../../redux/slices/userSlice.js";

const Dashboard = () => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.general.questions);
    const activeStep = useSelector(state => state.general.activeStep);
    const countSteps = useSelector(state => state.general.countSteps);
    const compeletedQuestions = useSelector(state => state.general.compeletedQuestions);
    const isFinal = useSelector(state => state.general.isFinal);
    const correctAnswersCount = useSelector(state => state.general.correctAnswersCount);
    const [startScreenChecked, setStartScreenCkecked] = useState(false);
    const categories = useSelector(state => state.cats.categories);
    const activeCat = useSelector(state => state.cats.activeCatId);
    const activeCatName = categories.find(item => item.id === activeCat)?.title || "";
    const generalStatus = useSelector(state => state.general.status);
    let errGeneral = useSelector(state => state.general.error);
    const authUser = useSelector(state => state.auth.authUser);
    const isNewAchievement = useSelector(state => state.auth.isNewAchievement);

    function clickStartScreenHandler() {
        setStartScreenCkecked(true);

        setTimeout(() => {
            dispatch(nextStep());
        }, 500);
    }

    function isCompletedQuiz(id) {
        return compeletedQuestions.includes(id);
    }

    if (isNewAchievement) {
        setTimeout(()=> {
            dispatch(resetNewAchievement());
        }, 5200);
    }

    useEffect(()=> {
        dispatch(fetchQuestions(activeCat));
        dispatch(resetAddCoins());
    }, [dispatch, activeCat]);

    useEffect(()=> {
        if (authUser && isFinal && activeStep >= countSteps && correctAnswersCount > 0) {
            const completeCat = authUser.completeCategories.find(cat => cat.cat === activeCat);

            if (authUser && completeCat) {
                if (correctAnswersCount > completeCat.bestResult) {
                    const count = correctAnswersCount - completeCat.bestResult;

                    dispatch(fetchCompleteCategory({
                        id: activeCat,
                        bestResult: correctAnswersCount,
                        dataFrom:{value: count * 5, method: "+"},
                        correctAnswersCount: count
                    }));
                }
            }

            if (!completeCat && authUser) {
                dispatch(fetchCompleteCategory({
                    id: activeCat,
                    bestResult: correctAnswersCount,
                    dataFrom: {value: (correctAnswersCount * 10), method: "+"},
                    correctAnswersCount
                }));
            }
        }
    }, [isFinal]);

    useEffect(()=> {
        if (errGeneral) {
            window.location.href = "/";
        }
    }, [errGeneral, isFinal]);

    return (
        <div className="dashboard">
            {
                generalStatus === "loading" ?
                    <Loader/>
                    :
                    <div className="dashboard__wrap">
                        <Progress/>

                        {
                            activeStep === 0 ?
                                <Screen id="start" isVisible={true} isChecked={startScreenChecked}>
                                    <img className="welcome_img" src="/images/spiral_note_pad.webp" alt=""/>
                                    <h3>Ответь на 10 простых вопросов</h3>
                                    <h4 className="violet_txt">{`Категория "${activeCatName}"`}</h4>
                                    <Button onClick={clickStartScreenHandler}>Начать</Button>
                                </Screen>
                                : ""
                        }

                        {
                            questions.map((q, key) => (
                                <Screen key={q.id} isVisible={activeStep === (key + 1)}
                                        isChecked={isCompletedQuiz(q.id)}>
                                    <Quiz id={q.id} question={q.question} answers={q.answers}/>
                                </Screen>
                            ))
                        }

                        {
                            activeStep > countSteps ?
                                <Screen id="final" isVisible={isFinal}>
                                    <img className="welcome_img" src="/images/welcome.webp" alt=""/>
                                    <h3>Вы ответили верно на <br/> {correctAnswersCount} вопросов из {countSteps}</h3>
                                    <Link to="/">
                                        <Button>На главную</Button>
                                    </Link>
                                </Screen>
                                : ""
                        }
                    </div>
            }
        </div>
    );
};

export default Dashboard;