import React from 'react'
import AddAgency from '../components/AddAgency';
import AddBrand from '../components/AddBrand';
import AddType from '../components/AddType';
import AddUser from '../components/AddUser';
const Admin = () => {
  return (
    <div className="grid grid-cols-4 gap-3 mt-5 mb-24 xl:pl-16 lg:pl-16 2xl:pl-52 ">
      <AddAgency />
      <AddBrand />
      <AddType />
      <AddUser />
    </div>
  );
}

export default Admin