import React, { useEffect } from "react";

export default function Vocabulary({ setIsBook }) {
  useEffect(() => {
    setIsBook(false);
  }, []);
  return <div>Vocabulary</div>;
}
