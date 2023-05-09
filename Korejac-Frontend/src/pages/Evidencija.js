import React, { useEffect } from "react";
import  Adresa  from "../ipadresa"


const Evidencija = () => {
  let month = new Date().toLocaleString("en-UK", { month: "2-digit" });
  let day = new Date().toLocaleString("en-UK", { day: "2-digit" });
  let year = new Date().getFullYear();

  useEffect(() => {
    window.location.replace(
      Adresa.adresa + `:3000/evidencija/${day}-${month}-${year}`
    );
  }, []);
  return <></>;
};

export default Evidencija;
