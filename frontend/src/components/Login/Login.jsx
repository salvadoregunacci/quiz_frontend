import Button from "../ui/Button/Button.jsx";
import {useForm} from "react-hook-form";
import TextField from "../ui/TextField/TextField.jsx";
import {fetchLogin, resetErr} from "../../redux/slices/userSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import CompactLoader from "../ui/CompactLoader/CompactLoader.jsx";
import {useEffect} from "react";
import "./styles.scss";

const Login = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.auth.status);
    const serverErr = useSelector(state => state.auth.error);

    const {
        handleSubmit,
        register,
        formState: {
            errors
        }
    } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        dispatch(resetErr());
    }, [dispatch]);

    function submitFormHandler(data) {
        dispatch(fetchLogin(data))
            .then(res => {
                if ("token" in res.payload) {
                    window.location.href = "/";
                }
            });
    }

    return (
        <div className="container container_hidden">
            <div style={{height: "100%"}} className="login_form">
                {
                    status === "loading" ?
                        <CompactLoader/>
                        : ""
                }
                <div className="form_wrap">
                    <h2>Вход</h2>
                    <form onSubmit={handleSubmit(submitFormHandler)}>
                        <div className={`server_err ${serverErr !== null ? "active" : ""} `}>{serverErr}</div>

                        <TextField
                            placeholder="Email"
                            isErr={Boolean(errors?.email?.message)}
                            helperText={errors?.email?.message}
                            {
                                ...register("email", {
                                    required: "Это обязательное поле",
                                })
                            }
                        />
                        <TextField
                            placeholder="Пароль"
                            isErr={Boolean(errors?.password?.message)}
                            helperText={errors?.password?.message}
                            visibleHandler={true}
                            {
                                ...register("password", {
                                    required: "Это обязательное поле",
                                })
                            }
                        />

                        <Button type="submit">Войти</Button>
                    </form>

                    <div className="form_helper">Нет аккаунта? <Link to="/register">создайте его</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login;