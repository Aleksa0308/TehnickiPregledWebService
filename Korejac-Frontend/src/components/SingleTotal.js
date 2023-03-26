import React from "react";

const SingleTotal = ({ data }) => {
  return (
    <div className="p-4 ">
      <h1 className="text-lg font-bold">{data.agencija}</h1>
      <div className="grid grid-cols-4 gap-2 text-center">
        <label className="text-gray-400 w-16">Vrsta</label>
        <label className="text-gray-400">Ukupno</label>
        <label className="text-gray-400">Tehnicki</label>
        <label className="text-gray-400">Placeno</label>
      </div>
      <div>
        {data.data.map((d) => {
          return (
            <div className="grid grid-cols-4 gap-2 text-center pl-2">
              <label className={ `text-justify border-b-2  p-1 ${d.vrsta===undefined ? 'font-bold border-black border-y-2' : '' } } `}>{d.vrsta===undefined ? d.zbir : d.vrsta}</label>
              <label className={` border-b-2 ${d.total===undefined ? 'font-bold border-black border-y-2 ' : '' }`}>{d.total === undefined ? d.sumUkupno : d.total}</label>
              <label className={` border-b-2 ${d.totalTehnicki===undefined ? 'font-bold border-black border-y-2 ' : '' }`}>{d.totalTehnicki === undefined ? d.sumTehnicki : d.totalTehnicki}</label>
              <label className={` border-b-2 ${d.totalPlaceno===undefined ? 'font-bold border-black border-y-2 ' : '' }`}>{d.totalPlaceno===undefined ? d.sumPlaceno : d.totalPlaceno}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleTotal;
