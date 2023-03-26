import React, { useState } from "react";
import { HiOutlineTrash, HiDocument, HiOutlinePencil } from "react-icons/hi";

const SingleBrand = ({ marka, deleteMarka, updateMarka }) => {
  const [toggle, setToggle] = useState(true);
  const [changeName, setChangeName] = useState(marka.name);

  const changeToggle = () => {
    if (toggle === false) {
      //pisi logiku
      if (changeName !== marka.name) {
        console.log("Razlicito je");
        updateMarka(marka.id, changeName)
      }
    }
    setToggle(!toggle);
  };

  return (
    <div className="grid grid-cols-2 grid-flow-col-dense p-2 border place-items-center">
      {toggle ? (
        marka.name
      ) : (
        <input
          type="text"
          defaultValue={changeName}
          required
          onChange={(e) => setChangeName(e.target.value)}
          className="w-28 text-center ring rounded"
        />
      )}

      <div>
        <button
          onClick={() => {
            deleteMarka(marka.id, marka.name);
          }}
          className=" xl:py-2 xl:px-3 lg:py-2 lg:px-4 mr-2 bg-pink-600 hover:bg-pink-500 text-white rounded"
        >
          <HiOutlineTrash />
        </button>
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
  );
};

export default SingleBrand;
