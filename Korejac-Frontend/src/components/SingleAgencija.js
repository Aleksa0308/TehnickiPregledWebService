import React, { useState } from 'react'
import { HiOutlineTrash, HiDocument, HiOutlinePencil } from "react-icons/hi";

const SingleAgencija = ({agen, deleteAgen, updateAgency}) => {

     const [toggle, setToggle] = useState(true)
     const [input, setInput] = useState(agen.name)

     

     const changeToggle = () => {
       if (toggle === false) {
         if(input !== agen.name){
          updateAgency(agen.id, input)
         }
       }
       setToggle(!toggle);
     };

  return (
    <div className="grid grid-cols-2 grid-flow-col-dense  p-2 border place-items-center">
      {toggle ? agen.name : (<div><input type="text" className='w-28 rounded text-center ring' required defaultValue={input} onChange={(e)=>setInput(e.target.value)} /></div>)}
      
      <div>
        <button onClick={()=> { deleteAgen(agen.id, agen.name)}} className=" xl:py-2 xl:px-3 lg:py-2 lg:px-4 mr-2 bg-pink-600 hover:bg-pink-500 text-white rounded">
          <HiOutlineTrash />
        </button>
        <button
          onClick={(e) => {
            changeToggle()
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
}

export default SingleAgencija