import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import cx from "classnames"
import classesCss from "../BookPage.module.scss";
import levelStyles from "../../styles/Styles.module.scss"
import Button from "../../../components/Buttons/Button";
import {useLocation} from "react-router-dom"

export default function GroupMenu({groupPath}){

  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const onGroupChanged = () => {
    sessionStorage.removeItem("currentPage");
  };

  const currentPage = location.pathname[location.pathname.length-1]
  return (
    <div className={classesCss.GroupMenu}>
      <Button
        className={cx(
          classesCss.GroupMenuToggle,
          levelStyles[`Level${currentPage}`]
          )}
        onClick={() => setIsOpen(!isOpen)}
        label={currentPage}/>

      <div className={cx(
        classesCss.PopUpMenu,
        {[classesCss.Active]:isOpen}
      )}>
      {new Array(6).fill(null).map((group, index) => {
        return (
          <NavLink
            key={"group"+index}
            to={"/book/" + groupPath + "group/" + (index+1)}
            onClick={onGroupChanged}
            className={cx(
              classesCss.BookLink,
              levelStyles[`Level${index + 1}`],
            )}
            activeClassName={classesCss.Active}
          >
            {index+1}
          </NavLink>
        );
      })}
      </div>
    </div>
  );
}