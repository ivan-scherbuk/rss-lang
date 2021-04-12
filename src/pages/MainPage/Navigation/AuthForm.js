import React, { useEffect, useState } from "react";
import Button from "../../../components/Buttons/Button";
import Input from "../../../components/Forms/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { createUser, signIn } from "../../../redux/actions.auth";
import classesCss from "./Navigation.module.scss";

const AuthForm = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(false);

  const dispatch = useDispatch();
  const { onLoading } = useSelector((state) => state.user);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (buttonPressed && !onLoading) {
      setError(true);
      setErrorMessage("Неверный Email или пароль!");
    }
  }, [onLoading]);

  const login = (mode) => {
    const validEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
    if (!validEmail.test(form.email)) {
      setError(true);
      setErrorMessage("Невалидный Email");
    } else if (form.password.length < 8) {
      setError(true);
      setErrorMessage("Минимальная длина пароля - 8 символов");
    } else {
      if (mode === "login") {
        dispatch(signIn(form));
      } else {
        dispatch(createUser(form));
      }
      setButtonPressed(true);
    }
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
        label={"Пароль "}
        onChange={changeHandler}
        minLength={8}
      />
      {error && <div>{errorMessage}</div>}
      <div className={classesCss.AuthButtonSet}>
        <Button
          onClick={() => login("login")}
          disabled={onLoading}
          label={"Войти"}
          className={[classesCss.SignInButton].join(" ")}
        />

        <Button
          onClick={() => login("register")}
          disabled={onLoading}
          label={"Регистрация"}
          className={[classesCss.SignUpButton].join(" ")}
        />
      </div>
    </div>
  );
};

export default AuthForm;
