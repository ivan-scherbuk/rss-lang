import React from "react";
import classesCss from "./BookPage.module.scss";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  setButtonsVisible,
  setTranslateVisible,
} from "../../redux/actions.book";

export default function BookSettings({ settingsOff }) {

  const { isTranslateVisible, isButtonsVisible } = useSelector(
    (store) => store.book
  );
  const dispatch = useDispatch();

  return (
    <div>
      <div className={classesCss.settingsContent}>
        <div>
          Перевод:{" "}
          <span
            onClick={() => dispatch(setTranslateVisible(!isTranslateVisible))}
            className={cx({ [classesCss.activeSettings]: isTranslateVisible })}
          >
            {" "}
            {isTranslateVisible ? "да" : "нет"}
          </span>
        </div>
        <div>
          Кнопки для добавления слов в разделы:{" "}
          <span
            onClick={() => dispatch(setButtonsVisible(!isButtonsVisible))}
            className={cx({ [classesCss.activeSettings]: isButtonsVisible })}
          >
            {" "}
            {isButtonsVisible ? "да" : "нет"}
          </span>
        </div>
      </div>
      <div onClick={settingsOff} className={classesCss.settingsBlackout} />
    </div>
  );
}
