import React, { useEffect, useState } from "react";
import SingleBrand from "./SingleBrand";

const AddBrand = () => {
  const token = document.cookie;
  const [input, setInput] = useState("");
  const [marke, setMarke] = useState([]);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const getMarke = async () => {
    const response = await fetch(
      "http://localhost:8080/api/marke",
      requestOptions
    );
    const data = await response.json();
    const marke = data.map((marka) => {
      const { id, name } = marka;
      return { id: id, name: name };
    });
    setMarke(marke);
  };

const deleteMarka = (id, name) => {
  let ans = window.confirm(`Da li ste sigurni da zelite da obrisete ${name}?`);
  if (ans) {
    fetch(`http://localhost:8080/api/marke/${id}`, {
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

const dodajMarku = async (e) => {
  if (input !== "") {
    fetch("http://localhost:8080/api/marke", {
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

const updateMarka = (id, name) =>{
    fetch(`http://localhost:8080/api/marke/${id}`, {
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
}

  useEffect(() => {
    getMarke();
  }, []);
  return (
    <div className="p-4 bg-white rounded h-fit">
      <h1 className="font-bold text-xl">Dodaj Marku:</h1>
      <form onSubmit={dodajMarku}>
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
        <h1 className="text-gray-500">Sve marke</h1>
        {marke.map((marka) => {
          return (
            <SingleBrand
              key={marka.id}
              marka={marka}
              deleteMarka={deleteMarka}
              updateMarka={updateMarka}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddBrand;
