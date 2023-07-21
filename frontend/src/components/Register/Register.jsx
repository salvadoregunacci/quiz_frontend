import TextField from "../ui/TextField/TextField.jsx";
import Button from "../ui/Button/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {fetchRegister} from "../../redux/slices/userSlice.js";
import {Link} from "react-router-dom";
import "./styles.scss";

const Register = () => {
    const dispatch = useDispatch();
    const serverErr = useSelector(state => state.auth.error);

    const {
        handleSubmit,
        register,
        getValues,
        formState: {
            errors
        }
    } = useForm({
        mode: "onBlur"
    });

    function submitFormHandler(data) {
        dispatch(fetchRegister(data))
            .then(res => {
                if ("token" in res.payload) {
                    window.location.href = "/";
                }
            })
    }

    return (
        <div className="container container_hidden">
            <div className="form_wrap register_form">
                <h2>Регистрация</h2>
                <form onSubmit={handleSubmit(submitFormHandler)}>
                    <div className={`server_err ${serverErr !== null ? "active" : ""} `}>{serverErr}</div>

                    <TextField
                        placeholder="Ник"
                        isErr={Boolean(errors?.name?.message)}
                        helperText={errors?.name?.message}
                        onlyLetter={true}
                        {
                            ...register("name", {
                                required: "Это обязательное поле",
                            })
                        }
                    />

                    <TextField
                        placeholder="Email"
                        isErr={Boolean(errors?.email?.message)}
                        helperText={errors?.email?.message}
                        {
                            ...register("email", {
                                required: "Это обязательное поле",
                                pattern: {
                                    value: /.+@.{2,}\..{2,}/g,
                                    message: "Неверный формат почты"
                                }
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
                                minLength: {
                                    value: 5,
                                    message: "Пароль не должен быть меньше 5 символов"
                                },
                            })
                        }
                    />

                    <TextField
                        placeholder="Повторите пароль"
                        isErr={Boolean(errors?.r_password?.message)}
                        helperText={errors?.r_password?.message}
                        visibleHandler={true}
                        {
                            ...register("r_password", {
                                required: "Это обязательное поле",
                                minLength: {
                                    value: 5,
                                    message: "Пароль не меньше 5 символов"
                                },
                                validate: {
                                    isValid: (val) => {
                                        const passVal = getValues("password");

                                        if (val === passVal) {
                                            return true;
                                        }

                                        return "Пароли не совпадают"
                                    }
                                }
                            })
                        }
                    />

                    <Button type="submit">Регистрация</Button>
                </form>

                <div className="form_helper">Уже есть аккаунта? <Link to="/login">войдите</Link> в него</div>
            </div>
        </div>
    )
};

export default Register;