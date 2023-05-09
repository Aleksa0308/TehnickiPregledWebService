import React, { useEffect } from "react";
import  Adresa  from "../ipadresa"

const Statistics = () => {
  const token = document.cookie;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const redirectPage = async () => {
    let month = new Date().toLocaleString("en-UK", { month: "2-digit" });
    let day = new Date().toLocaleString("en-US", { day: "2-digit" });
    let year = new Date().getFullYear();

    const response = await fetch(
      Adresa.adresa + ":8080/api/evidencije/first",
      requestOptions
    );
    const data = await response.json();
    let datum2 = data.datum.split("-");

    window.location.replace(
      Adresa.adresa + `:3000/statistika/${datum2[2]}-${datum2[1]}-${datum2[0]}&${day}-${month}-${year}`
    );
  };

  useEffect(() => {
    redirectPage();
  }, []);
  return <></>;
};

export default Statistics;
