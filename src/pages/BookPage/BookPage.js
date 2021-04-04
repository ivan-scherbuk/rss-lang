import React, { useState } from "react";
import { useSelector } from "react-redux";
import BookHeader from "./BookHeader.js";
import BookMain from "./BookMain.js";
import classesCss from "./BookPage.module.scss";

export default function BookPage() {
  const [groupPath, setGroupPath] = useState("");
  const [settingsToggle, setSettingsToggle] = useState(false);
  const [gameState, setGameState] = useState(
    JSON.parse(sessionStorage.getItem("gameState"))
  );
  const settingsOff = () => {
    setSettingsToggle(false);
  };

  const settingsOn = () => {
    setSettingsToggle(true);
  };
  const { isLogged } = useSelector((state) => state.user);
  return (
    <div className={classesCss.BookPage}>
      <BookHeader
        settingsOn={settingsOn}
        groupPath={groupPath}
        gameState={gameState}
        isLogged={isLogged}
      />
      <div className={classesCss.Main}>
        <BookMain
          setGroupPath={setGroupPath}
          settingsToggle={settingsToggle}
          settingsOff={settingsOff}
          setGameState={setGameState}
          groupPath={groupPath}
          isLogged={isLogged}
        />
      </div>
    </div>
  );
}
