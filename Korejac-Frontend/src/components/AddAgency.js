import React, { useEffect, useState } from "react";
import SingleAgencija from "./SingleAgencija";

const AddAgency = () => {
  const token = document.cookie;

  const [agencije, setAgencije] = useState([]);
  const [input, setInput] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getAgencije = async () => {
    const response = await fetch(
      "http://localhost:8080/api/agencije",
      requestOptions
    );
    const data = await response.json();
    const agencije = data.map((agencija) => {
      const { id, name } = agencija;
      return { id: id, name: name };
    });
    setAgencije(agencije);
  };

  const deleteAgency = (id, name) => {
    let ans = window.confirm(
      `Da li ste sigurni da zelite da obrisete ${name}?`
    );
    if (ans) {
      fetch(`http://localhost:8080/api/agencije/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(() => {
        window.location.reload();
      });
    }
  };

  const updateAgency = (id, name) => {
    fetch(`http://localhost:8080/api/agencije/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: `${name}`,
      }),
    }).then(() => {
      window.location.reload();
    });
  };

  const dodajAgenciju = async (e) => {
    if (input !== "") {
      fetch("http://localhost:8080/api/agencije", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: `${input}`,
        }),
      });
    }
  };

  useEffect(() => {
    getAgencije();
  }, []);

  return (
    <div className="p-4  bg-white rounded h-fit">
      <h1 className="font-bold text-xl">Dodaj Agenciju:</h1>
      <form onSubmit={dodajAgenciju}>
        <div className="flex flex-col">
          <div className="flex flex-col my-5">
            <label>Ime</label>
            <input
              type="text"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-gray-100 rounded p-2 focus:outline-none text-gray-600"
            />
          </div>
          <div className="grid place-items-center ">
            <input
              type="submit"
              className=" cursor-pointer bg-blue-700 rounded text-white text-sm px-16 py-2 hover:bg-blue-600"
              value="+ Dodaj"
            />
          </div>
        </div>
      </form>
      <div className="mt-6">
        <h1 className="text-gray-500">Sve agencije</h1>
        {agencije.map((agen) => {
          return (
            <SingleAgencija
              key={agen.id}
              agen={agen}
              deleteAgen={deleteAgency}
              updateAgency={updateAgency}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddAgency;
