import React, {useState} from "react";
import cx from "classnames";
import classesCss from "../BookPage.module.scss";
import Pagination from "./Pagination";
import GroupMenu from "./GroupMenu";
import { useSelector } from "react-redux";
import GameMenu from "./GameMenu";
import { MODE_BOOK, MODE_VOCABULARY, VOCABULARY_MODE_DELETED, VOCABULARY_MODE_NORMAL } from "../../../settings/settings";
import ModeToggle from "./ModeToggle";
import HomeLink from "../../../components/Buttons/HomeLink";
import SettingsButton from "../../../components/Buttons/SettingsButton";
import TotalValuesDisplay from "./TotalValuesDisplay";
import PopUpMenuButton from "../../../components/Buttons/PopUpMenuButton";

export default function BookMenu({settingsOn, totalPagesCount, totalValues}){
  const {isLogged} = useSelector(({user}) => user);
  const {currentGroup, mode, vocabularyMode} = useSelector(({book}) => book);
  const [isSmallMenuOpened, setSmallMenuOpened] = useState(false)

  const isGameMenuVisible =
    mode === MODE_BOOK
    || (mode === MODE_VOCABULARY && vocabularyMode !== VOCABULARY_MODE_DELETED)


  return (
    <div className={classesCss.BookMenu}>

      <div className={cx(
        classesCss.SmallWidthMenu,
        {[classesCss.ShowWithSmallWidth]: isLogged},
      )}>
        <PopUpMenuButton
          className={classesCss.ShowWithSmallWidth}
          onClick={() => setSmallMenuOpened(!isSmallMenuOpened)}
          active={isSmallMenuOpened}
        />
        <div className={cx(classesCss.PopUpMenu, {[classesCss.Active]: isSmallMenuOpened})}>
          <HomeLink/>
          <SettingsButton onClick={settingsOn}/>
          <ModeToggle mode={mode} currentGroup={currentGroup}/>
          {isGameMenuVisible ? <GameMenu/> : null}
          <GroupMenu/>
        </div>
      </div>


      <HomeLink className={cx({[classesCss.HideWithSmallWidth]: isLogged})}/>

      {isLogged?
        <SettingsButton onClick={settingsOn} className={classesCss.HideWithSmallWidth}/>
        : null}

      {isLogged?
        <ModeToggle mode={mode} currentGroup={currentGroup} className={classesCss.HideWithSmallWidth}/>
        : null}

      {isGameMenuVisible ?
        <GameMenu className={cx({[classesCss.HideWithSmallWidth]: isLogged})}/>
        : null}

      <Pagination totalPagesCount={totalPagesCount}/>

      {isLogged && !(mode === MODE_VOCABULARY && vocabularyMode !== VOCABULARY_MODE_NORMAL) ?
        <TotalValuesDisplay totalValues={totalValues}/> : null
      }

      <GroupMenu className={cx({[classesCss.HideWithSmallWidth]: isLogged})}/>
    </div>
  );
}
