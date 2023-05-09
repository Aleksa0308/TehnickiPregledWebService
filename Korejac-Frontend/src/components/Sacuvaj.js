import React from "react";
import  Adresa  from "../ipadresa"

const Sacuvaj = ({ arr, date }) => {
  const token = document.cookie;

  const postSpec = async () => {
    const redovi = arr.map((red) => {
      const { num, agencija, vrsta, marka, reg, tehnicki, placeno, napomena } =
        red;
      return {
        num: num,
        agencija: agencija,
        vrsta: vrsta,
        marka: marka,
        reg: reg,
        tehnicki: tehnicki,
        placeno: placeno,
        napomena: napomena,
        datum: date,
      };
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: redovi }),
    };

    fetch(Adresa.adresa + `:8080/api/evidencije/${date}`, requestOptions).then(
      (response) => {
        if (response.status === 200) {
          alert("USPESNO SACUVANA EVIDENCIJA!");
          window.location.reload();
        } else if (response.status === 400) {
          alert("SACUVALI STE PRAZNU EVIDENCIJU!");
          window.location.reload();
        } else {
          alert("GRESKA PRI CUVANJU PODATAKA!!!");
          window.location.reload();
        }
      }
    );
  };

  return (
    <div>
      <button
        onClick={postSpec}
        className="py-2 px-5 text-white rounded bg-blue-600 hover:bg-blue-500 mx-3"
      >
        Sacuvaj
      </button>
    </div>
  );
};

export default Sacuvaj;
