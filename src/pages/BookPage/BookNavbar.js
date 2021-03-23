import React from "react";
import classesCss from "./../styles/BookPage.module.scss";

export default function BookNavbar({ setCurrentGroup }) {
  let groups = [];
  const totalGroupsCount = 6;
  for (let i = 1; i <= totalGroupsCount; i++) {
    groups.push(i);
  }
  const onGroupChanged = (group) => {
    setCurrentGroup(group - 1);
    localStorage.setItem("group", group - 1);
  };
  return (
    <div className={classesCss.BookNavbar}>
      {groups.map((group) => {
        return <div onClick={() => onGroupChanged(group)}>Group {group}</div>;
      })}
    </div>
  );
}
