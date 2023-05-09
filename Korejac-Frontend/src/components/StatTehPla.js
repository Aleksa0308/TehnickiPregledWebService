import React, { useEffect, useState } from 'react'

const StatTehPla = ({tehnicki, placeno}) => {

  return (
    <div
      className={`grid grid-cols-2 p-4 ring bg-white rounded ${
        placeno < tehnicki ? "ring-red-400" : "ring-green-400"
      }`}
    >
      <div className="flex flex-col border-r-4">
        <h2 className="text-xl">Tehnicki</h2>
        <h1 className="text-3xl font-bold mt-2 text-blue-500">
          {tehnicki}
          <span className="text-lg text-black">rsd</span>
        </h1>
      </div>
      <div className="flex flex-col pl-4">
        <h2 className="text-xl">Placeno</h2>
        <h1
          className={`text-3xl font-bold mt-2 ${
            placeno < tehnicki ? "text-red-400" : "text-green-400"
          }`}
        >
          {placeno}
          <span className="text-lg text-black">rsd</span>
        </h1>
      </div>
    </div>
  );
}

export default StatTehPla