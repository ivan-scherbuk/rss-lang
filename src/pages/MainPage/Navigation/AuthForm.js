import React, { useState } from "react"
import Button from "../../../components/Buttons/Button"
import Input from "../../../components/Forms/Input/Input"
import { useDispatch, useSelector } from "react-redux"
import { createUser, signIn } from "../../../redux/actions.auth"
import classesCss from "./Navigation.module.scss"

const AuthForm = () => {

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
    <div className={classesCss.AuthForm}>
      <Input
        autoComplete={"off"}
        className={classesCss.AuthInput}
        type={"text"}
        name={"email"}
        label={`Email: `}
        onChange={changeHandler}
      />
      <Input
        autoComplete={"off"}
        className={classesCss.AuthInput}
        type={"password"}
        name={"password"}
        label={'Пароль '}
        onChange={changeHandler}
        minLength={8}
      />
      <div className={classesCss.AuthButtonSet}>
        <Button
          onClick={() => {
            dispatch(signIn(form))
          }}
          disabled={onLoading}
          label={"Войти"}
          className={[classesCss.SignInButton].join(" ")}
        />

        <Button
          onClick={() => {
            dispatch(createUser(form))
          }}
          disabled={onLoading}
          label={"Регистрация"}
          className={[classesCss.SignUpButton].join(" ")}
        />
      </div>
    </div>
  );
};

export default AuthForm;
