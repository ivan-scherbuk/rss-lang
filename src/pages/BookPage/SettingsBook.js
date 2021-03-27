import React, { useEffect } from "react";

export default function SettingsBook({ setIsBook }) {
  useEffect(() => {
    setIsBook(false);
  }, []);
  return <div>Settings</div>;
}
