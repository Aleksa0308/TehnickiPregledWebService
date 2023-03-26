import React, { useEffect, useState } from "react";
import DoughnutStat from "../components/DoughnutStat";
import PreuzmiStatistika from "../components/PreuzmiStatistika";

import StatTehPla from "../components/StatTehPla";
import TotalStatistik from "../components/TotalStatistik";

const SingleStatistics = () => {
  const token = document.cookie
  const [datum1, setDatum1] = useState("");
  const [datum2, setDatum2] = useState("");
  const datumFull = window.location.pathname.split("/").pop()
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  const [tehnicki, setTehnicki] = useState(0);
  const [placeno, setPlaceno] = useState(0);


   const requestOptions = {
     method: "GET",
     headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${token}`,
     },
   };
   

   const getTehnicki = async () => {
     const response = await fetch(
       `http://localhost:8080/api/statistika/tehnicki/${datumFull}`,
       requestOptions
     );
     const data = await response.json();
     setTehnicki(data.total);
   };

   const getPlaceno = async () => {
     const response = await fetch(
       `http://localhost:8080/api/statistika/placeno/${datumFull}`,
       requestOptions
     );
     const data = await response.json();
     setPlaceno(data.total);
   };

   const getTotal = async () => {
     const response = await fetch(
       `http://localhost:8080/api/statistika/total/${datumFull}`,
       requestOptions
     );
     const data = await response.json();
     setTotal(data.total);
   };

   const getData = async () => {
     const response = await fetch(
       `http://localhost:8080/api/statistika/grupisano/${datumFull}`,
       requestOptions
     );
     const res = await response.json();
     console.log(res.data);
     setData(res.data);
   };


  const setDates = () =>{
    let value = window.location.pathname.split("/").pop();
    value = value.split('&')
    let date1 = value[0].split('-')
    let date2 = value[1].split('-')
    
    setDatum1(`${date1[2]}-${date1[1]}-${date1[0]}`)
    setDatum2(`${date2[2]}-${date2[1]}-${date2[0]}`);
  }

  const setPageParams = (value)=>{
    console.log(value);
    let tmp2 = value.split('-')
    setDatum2(value)
    let tmp1 = datum1.split('-')
    window.location.replace(
      `http://localhost:3000/statistika/${tmp1[2]}-${tmp1[1]}-${tmp1[0]}&${tmp2[2]}-${tmp2[1]}-${tmp2[0]}`
    );
  }
  useEffect(() => {
    setDates();
    getData();
    getTotal();
    getTehnicki()
    getPlaceno()
  }, []);

  return (
    <div className="flex flex-col items-center xl:pl-16 lg:pl-16">
      <div className="">
        <div className="flex items-center text-2xl font-bold pt-8 lg:text-lg xl:text-2xl  2xl:left-72 xl:left-64  lg:left-64 top-8">
          Statistika od:
          <input
            type="date"
            name="date"
            id="date"
            value={datum1}
            onChange={(e) => setDatum1(e.target.value)}
            className="p-2 rounded ml-2 ring-2"
          />
          <span className="px-4">do:</span>
          <input
            type="date"
            name="date2"
            id="date2"
            value={datum2}
            onChange={(e) => setPageParams(e.target.value)}
            className="p-2 rounded ml-2 ring-2"
          />
          <div className="ml-10">
            <PreuzmiStatistika datum={datumFull} data={data} ukupno={total} tehnicki={tehnicki} placeno={placeno} />
          </div>
        </div>
        <div className="flex flex-row pt-10 pl-10">
          <div className="mr-6">
            <DoughnutStat datum={datumFull} tot={total} />
          </div>
          <div className="flex flex-col">
            <div className="w-fit">
              <StatTehPla tehnicki={tehnicki} placeno={placeno} />
            </div>
            <div className="mt-6">
              <TotalStatistik datum={datumFull} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleStatistics;
