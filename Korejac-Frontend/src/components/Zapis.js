import React, { useState } from "react";
import { HiOutlineTrash, HiOutlinePencil, HiDocument } from "react-icons/hi";
import Select from "react-select";
import  Adresa  from "../ipadresa"

const Zapis = ({ zap, deleteZap, edit, flag }) => {


  const token = document.cookie;

  const [toggle, setToggle] = useState(true);
  const [selekcija, setSelekcija] = useState([]);
  const [agencija, setAgencije] = useState(zap.agencija);
  const [marka, setMarka] = useState(zap.marka);
  const [reg, setReg] = useState(zap.reg);
  const [tehnicki, setTehnicki] = useState(zap.tehnicki);
  const [placeno, setPlaceno] = useState(zap.placeno);
  const [napomena, setNap] = useState(zap.napomena);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const getAgencije = async () => {
    const response = await fetch(
      Adresa.adresa + ":8080/api/agencije",
      requestOptions
    );
    const data = await response.json();
    const age = data.map((age) => {
      const { name } = age;
      return { value: name, label: name };
    });
    setSelekcija(age);
  };

  const changeToggle = () => {
    if (toggle === false) {
      edit(zap.num, agencija, marka, reg, tehnicki, placeno, napomena);
    }
    setToggle(!toggle);
    getAgencije()
  };

  const getReg = (event) => {
    const regValue = event.target.value;
    setReg(regValue);
  };
  const getTehnicki = (event) => {
    const tehValue = event.target.value;
    setTehnicki(tehValue);
  };
  const getPlaceno = (event) => {
    const plaValue = event.target.value;
    setPlaceno(plaValue);
  };
  const getNapomena = (event) => {
    const napValue = event.target.value;
    setNap(napValue);
  };
  const getAgen = (event) => {
    const agenValue = event.target.value;
    setAgencije(agenValue);
  };
  const getMarka = (event) => {
    const markaValue = event.target.value;
    setMarka(markaValue);
  
  };

  const agencijaChange = (selectedOption) => {
    setAgencije(selectedOption.value);
  };

  return (
    <div className={`${flag ? 'ring-2 rounded ring-green-600' : ''}`}>
      <div
        className={`flex justify-center items-center bg-white rounded-md p-4 place-items-stretch my-2 text-center  ${
          toggle ? "ring-0" : "ring-2"
        }`}
      >
        <h2 className={`border-r-4 xl:px-6 lg:px-4 xl:text-md lg:text-sm w-14 ${flag ? 'font-bold text-green-600 ' : 'font-bold text-blue-400' }  `}>
          {zap.num}
        </h2>
        {toggle ? (<h2 className="border-r-4 xl:px-6 lg:px-4 xl:text-md lg:text-sm w-24">
          {zap.agencija} 
        </h2>) : (<Select options={selekcija} onChange={agencijaChange} defaultValue={{label: zap.agencija , value: zap.agencija}} required />)}
        
        {toggle ? (<h2 className="border-r-4 xl:px-6 lg:px-4 xl:text-md lg:text-sm w-28">
          {zap.marka}
        </h2>) : (<input
            type="text"
            defaultValue={zap.marka}
            onChange={getMarka}
            className="text-center text-sm ring-2 rounded  xl:w-28 lg:w-24 mx-4 p-1 "
          />) }
        
        {toggle ? (
          <h2 className="border-r-4 xl:px-8 lg:px-4 xl:text-md lg:text-sm xl:w-44 lg:w-32">
            {zap.reg}
          </h2>
        ) : (
          <input
            type="text"
            defaultValue={zap.reg}
            onChange={getReg}
            className="text-center text-sm ring-2 rounded  xl:w-36 lg:w-24 mx-4 p-1 "
          />
        )}
        {toggle ? (
          <h2 className="border-r-4 xl:px-8 lg:px-4 xl:text-md lg:text-sm xl:w-28 lg:w-20">
            {zap.tehnicki}
          </h2>
        ) : (
          <input
            type="text"
            defaultValue={zap.tehnicki}
            onChange={getTehnicki}
            className="text-center text-sm ring-2 rounded  xl:w-20 lg:w-14 mx-4 p-1 "
          />
        )}
        {toggle ? (
          <h2 className="border-r-4 xl:px-8 lg:px-4 xl:text-md lg:text-sm xl:w-28 lg:w-20">
            {zap.placeno}
          </h2>
        ) : (
          <input
            type="text"
            defaultValue={zap.placeno}
            onChange={getPlaceno}
            className="text-center  text-sm  ring-2 rounded  xl:w-20 lg:w-14 mx-4 p-1 "
          />
        )}
        {toggle ? (
          <h2 className="border-r-4 xl:px-8 lg:px-4 xl:text-md lg:text-sm xl:w-36 lg:w-28">
            {zap.napomena || "/"}
          </h2>
        ) : (
          <input
            type="text"
            defaultValue={zap.napomena}
            onChange={getNapomena}
            className="text-center  text-sm ring-2 rounded  xl:w-32 lg:w-20 mx-4 p-1 "
          />
        )}
        
        <div className="px-2 pl-8">
          {flag ? (<div></div>) : (<button
            onClick={() => {
              deleteZap(zap.num);
            }}
            className="xl:py-2 xl:px-3 lg:py-2 lg:px-4 mr-2 bg-pink-600 hover:bg-pink-500 text-white rounded"
          >
            <HiOutlineTrash />
          </button>)}
          

          <button
            onClick={(e) => {
              changeToggle();
            }}
            className="xl:py-2 xl:px-3 lg:py-2 lg:px-4 bg-blue-300 hover:bg-blue-200 text-white rounded"
          >
            {toggle ? (
              <HiOutlinePencil />
            ) : (
              <HiDocument className="animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Zapis;
