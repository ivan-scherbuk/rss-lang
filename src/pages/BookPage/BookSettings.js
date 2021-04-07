import React from "react";
import classesCss from "./BookPage.module.scss";
import cx from "classnames";
import CheckIcon from '@material-ui/icons/Check';
import ToggleButton from '@material-ui/lab/ToggleButton';
import { useDispatch, useSelector } from "react-redux";
import {
  setButtonsVisible,
  setTranslateVisible,
} from "../../redux/actions.book";
import CloseButton from "../../components/Buttons/CloseButton";

export default function BookSettings({ settingsOff }) {

  const { isTranslateVisible, isButtonsVisible } = useSelector((store) => store.book);
  const dispatch = useDispatch();

  return (
    <div className={classesCss.SettingsBlock} onClick={settingsOff}>
      <div className={classesCss.SettingsContent} onClick={event => {event.stopPropagation()}}>
        <CloseButton className={classesCss.SettingsCloseButton} onClick={settingsOff}/>
        <h3>Настройки</h3>
        <div className={classesCss.SettingButtonBlock}>
          <ToggleButton
            className={classesCss.SettingButton}
            classes={{
              selected:classesCss.Selected,
              disabled:classesCss.Disabled
            }}
            value="check"
            selected={isTranslateVisible}
            onChange={() => dispatch(setTranslateVisible(!isTranslateVisible))}
          >
            <CheckIcon />
          </ToggleButton>
          <span className={classesCss.SettingButtonText}>Перевод</span>
        </div>
        <div className={classesCss.SettingButtonBlock}>
          <ToggleButton
            className={classesCss.SettingButton}
            classes={{
              selected:classesCss.Selected,
              disabled:classesCss.Disabled
            }}
            value="check"
            selected={isButtonsVisible}
            onChange={() => dispatch(setButtonsVisible(!isButtonsVisible))}
          >
            <CheckIcon />
          </ToggleButton>
          <span className={classesCss.SettingButtonText}>Кнопки управления словами</span>
        </div>
      </div>
    </div>
  );
}
