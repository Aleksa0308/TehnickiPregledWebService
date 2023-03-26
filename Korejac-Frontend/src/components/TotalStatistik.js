import React, { useEffect, useState } from "react";
import SingleTotal from "./SingleTotal";

const TotalStatistik = ({ data }) => {

 
 

  return (
    <div className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-4">
      {data.map((d, index) => {
        return (
          <div className=" bg-white rounded  w-auto">
            <SingleTotal key={index} data={d} />
          </div>
        );
      })}
    </div>
  );
};

export default TotalStatistik;
