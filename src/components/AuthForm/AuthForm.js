import React, { useState } from "react"
import Button from "../Buttons/Button"
import Input from "../Forms/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { createUser, signIn } from "../../redux/actions"

const AuthForm = (props) => {

  const {
    classes,
    message,
  } = props

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch()
  const {onLoading} = useSelector(state => state.user)

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
          onClick={() => {
            dispatch(signIn(form))
          }}
          disabled={onLoading}
          label={"Sign In"}
          className={[classes?.SignInButton, classes?.FormButton].join(" ")}
        />

        <Button
          onClick={() => {
            dispatch(createUser(form))
          }}
          disabled={onLoading}
          label={"Register"}
          className={[classes?.SignUpButton, classes?.FormButton].join(" ")}
        />
        {onLoading? "Loading....": null}
      </div>
    </div>
  );
};

export default AuthForm;
