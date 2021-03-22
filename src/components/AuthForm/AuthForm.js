import React, { useState } from "react"
import Button from "../Buttons/Button"
import Input from "../Forms/Input/Input"

const AuthForm = (props) => {

  const {
    classes,
    message,
    loginHandler,
    signUpHandler,
    waitCondition,
  } = props

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className={classes?.AuthForm}>
      <div className={classes?.FormMessage}>{message}</div>
      <Input
        autoComplete={"off"}
        className={classes?.AuthInput}
        type={"text"}
        name={"email"}
        label={`Email: `}
        onChange={changeHandler}

      />
      <Input
        autoComplete={"off"}
        className={classes?.AuthInput}
        type={"password"}
        name={"password"}
        label={'Пароль '}
        onChange={changeHandler}
      />
      <div className={classes?.AuthButtonSet}>
        <Button
          onClick={() => loginHandler(form)}
          disabled={waitCondition}
          label={"Sign In"}
          className={[classes?.SignInButton, classes?.FormButton].join(" ")}
        />

        <Button
          onClick={() => signUpHandler(form)}
          disabled={waitCondition}
          label={"Register"}
          className={[classes?.SignUpButton, classes?.FormButton].join(" ")}
        />
      </div>
    </div>
  );
};

export default AuthForm;
