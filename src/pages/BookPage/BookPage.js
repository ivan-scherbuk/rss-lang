import React, { useState } from "react";
import BookHeader from "./BookHeader.js";
import BookMain from "./BookMain.js";
import classesCss from "./../styles/BookPage.module.scss";
import BookNavbar from "./BookNavbar.js";

export default function BookPage() {
  const [groupPath, setGroupPath] = useState("");
  const [settingsToggle, setSettingsToggle] = useState(false);
  const settingsOff = () => {
    setSettingsToggle(false);
  };

  const settingsOn = () => {
    setSettingsToggle(true);
  };
  return (
    <div className={classesCss.BookPage}>
      <BookHeader settingsOn={settingsOn} groupPath={groupPath} />
      <div className={classesCss.main}>
        <BookNavbar groupPath={groupPath} />
        <div>
          <BookMain
            setGroupPath={setGroupPath}
            settingsToggle={settingsToggle}
            settingsOff={settingsOff}
          />
        </div>
      </div>
    </div>
  );
}
