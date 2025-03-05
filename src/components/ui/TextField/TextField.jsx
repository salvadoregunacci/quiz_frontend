import "./styles.scss";
import React, {useState} from "react";

const TextField = React.forwardRef(({
                                        type = "text",
                                        placeholder,
                                        helperText,
                                        isErr,
                                        onBlur,
                                        onInput,
                                        visibleHandler,
                                        onlyLetter,
                                        ...props
                                    }, ref) => {

    const [isFocus, setFocus] = useState(false);
    const [isActive, setActive] = useState(false);
    const [visibleContent, setVisibleContent] = useState(false);
    const [typeField, setTypeField] = useState(visibleHandler ? "password" : type);

    function changeVisibleContentHandler() {
        if (visibleContent) {
            setVisibleContent(false);
            setTypeField("password");
            return;
        }

        setVisibleContent(true);
        setTypeField("text");
    }

    function focusHandler() {
        setFocus(true);
        setActive(true);
    }

    const onBlurCustom = (e) => {
        onBlur(e);
        setActive(false);

        if (e.target.value === "") {
            setFocus(false);
        }
    }

    const onInputCustom = (e) => {
        if (onInput) onInput(e);

        if (onlyLetter) {
            e.target.value = e.target.value.replace(/[^a-zA-Z|a-я\d]/g, "");
        }
    }

    return (
        <div className="field_wrap">
            <div className={`field ${(isFocus ? "focus" : "")} ${(isActive ? "active" : "")}`}>
                <input ref={ref} type={typeField} onFocus={focusHandler} onBlur={onBlurCustom} {...props} onInput={onInputCustom} />
                {
                    visibleHandler ?
                        <div className="field__visible_handler" onClick={changeVisibleContentHandler}>
                            <img
                                src={(visibleContent ? "/images/icons/eye-visible.svg" : "/images/icons/eye-hidden.svg")}
                                alt="handler"/>
                        </div>
                        : ""
                }
                <span className="field_placeholder">{placeholder ? placeholder : "field"}</span>
            </div>
            {
                isErr ?
                    <div className="err_field">{helperText}</div>
                    : ""
            }
        </div>
    );
});

TextField.displayName = "TextField";
export default TextField;