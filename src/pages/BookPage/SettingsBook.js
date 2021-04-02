import React from "react";
import classesCss from "./../styles/BookPage.module.scss";

export default function SettingsBook({ settingsOff }) {
  return (
    <div>
      <div className={classesCss.settingsContent}>Settings</div>
      <div onClick={settingsOff} className={classesCss.settingsBlackout}></div>
    </div>
  );
}
