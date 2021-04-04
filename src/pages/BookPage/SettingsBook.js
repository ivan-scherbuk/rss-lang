import React from "react";
import classesCss from "./BookPage.module.scss";

export default function SettingsBook({
  settingsOff,
  translate,
  setTranslate,
  buttons,
  setButtons,
}) {
  const translateChange = (toggle) => {
    setTranslate(toggle);
    sessionStorage.setItem("translateSettings", toggle);
  };
  const buttonsChange = (toggle) => {
    setButtons(toggle);
    sessionStorage.setItem("buttonsChange", toggle);
  };
  return (
    <div>
      <div className={classesCss.settingsContent}>
        <div>
          Перевод:{" "}
          <span
            onClick={() => translateChange("y")}
            className={translate === "y" && classesCss.activeSettings}
          >
            да
          </span>{" "}
          |{" "}
          <span
            onClick={() => translateChange("n")}
            className={translate === "n" && classesCss.activeSettings}
          >
            нет
          </span>
        </div>
        <div>
          Кнопки для добавления слов в разделы:{" "}
          <span
            onClick={() => buttonsChange("y")}
            className={buttons === "y" && classesCss.activeSettings}
          >
            да
          </span>{" "}
          |{" "}
          <span
            onClick={() => buttonsChange("n")}
            className={buttons === "n" && classesCss.activeSettings}
          >
            нет
          </span>
        </div>
      </div>
      <div onClick={settingsOff} className={classesCss.settingsBlackout}/>
    </div>
  );
}
