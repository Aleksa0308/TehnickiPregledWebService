import React, { useState } from 'react'
import { HiOutlineTrash, HiDocument, HiOutlinePencil } from "react-icons/hi";

const SingleType = ({type, deleteType, updateType}) => {
    const [name, setName] = useState(type.name)
    const [price, setPrice] = useState(type.price)
    const [toggle, setToggle] = useState(true);


    const changeToggle = () => {
      if (toggle === false) {
        if(name !== type.name || price !== type.price){
            updateType(type.id, name, price)
        }
      }
      setToggle(!toggle);
    };

  return (
    <div className="grid grid-cols-2 border p-2">
      <div className="grid grid-rows-2">
        <label>
          {toggle ? (
            <div>
              <span className="text-gray-500">Ime: </span> {type.name}
            </div>
          ) : (
            <div>
              <input
                type="text"
                required
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
                className="w-28 text-center ring rounded"
              />
            </div>
          )}
        </label>
        <label>
          {toggle ? (
            <div>
              <span className="text-gray-500">Cena: </span> {type.price}
            </div>
          ) : (
            <div>
              <input
                type="text"
                required
                defaultValue={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-28 text-center ring rounded mt-1"
              />
            </div>
          )}
        </label>
      </div>
      <div>
        <div className="pl-4 pt-2">
          <button
            onClick={() => {
              deleteType(type.id, type.name);
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
    </div>
  );
}

export default SingleType