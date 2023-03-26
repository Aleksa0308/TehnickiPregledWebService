import React, { useEffect, useState } from 'react'
import SingleType from './SingleType';

const AddType = () => {
    const token = document.cookie
    const [input, setInput] = useState('')
    const [inputPrice, setInputPrice] = useState(0);
    const [types, setTypes] = useState([])
    


    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };


    const getTypes = async () => {
      const response = await fetch(
        "http://localhost:8080/api/vrste",
        requestOptions
      );
      const data = await response.json();
      const types = data.map((type) => {
        const { id, name, price } = type;
        return { id: id, name: name, price: price };
      });
      setTypes(types);
    };

    const deleteType = (id, name)=>{
       let ans = window.confirm(
         `Da li ste sigurni da zelite da obrisete ${name}?`
       );
       if (ans) {
         fetch(`http://localhost:8080/api/vrste/${id}`, {
           method: "DELETE",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }).then(() => {
           window.location.reload();
         });
       }
    }
    const updateType = (id, name, price)=>{
        fetch(`http://localhost:8080/api/vrste/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: `${name}`,
            price: `${price}`
          }),
        }).then(() => {
          window.location.reload();
        });
    }

    const dodajType = async () => {
      if (input !== "" && inputPrice !== "") {
        fetch("http://localhost:8080/api/vrste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: `${input}`,
            price: `${inputPrice}`
          }),
        });
      }
    };

    useEffect(()=>{
        getTypes();
    },[])

  return (
    <div className="p-4 bg-white rounded h-fit">
      <h1 className="font-bold text-xl">Dodaj Vrstu:</h1>
      <form onSubmit={dodajType}>
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
            <label>Cena</label>
            <input
              type="number"
              required
              value={inputPrice}
              onChange={(e) => setInputPrice(e.target.value)}
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
        <h1 className="text-gray-500">Sve vrste</h1>
        {types.map((type) => {
          return (
            <SingleType
              key={type.id}
              type={type}
              deleteType={deleteType}
              updateType={updateType}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AddType