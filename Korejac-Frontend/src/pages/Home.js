import React, { useEffect } from 'react'

const Home = () => {


  let month = new Date().toLocaleString("en-UK", { month: "2-digit" });
  let day = new Date().toLocaleString("en-US", { day: "2-digit" });
  let year = new Date().getFullYear();

   useEffect(() => {
     window.location.replace(`http://localhost:3000/evidencija/${day}-${month}-${year}`);
   }, [day, month, year]);
  return (
    <>
    
    </>
  )
}

export default Home