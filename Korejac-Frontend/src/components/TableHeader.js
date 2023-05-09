import React from 'react'

const TableHeader = () => {
  return (
    <div className="flex text-sm px-8 text-gray-500 text-center">
      <label className="xl:w-6 lg:w-6">Br.</label>
      <label className="xl:w-32 lg:w-32">Agencija</label>
      <label className="xl:w-24 lg:w-24">Vozilo</label>
      <label className="xl:w-44 lg:w-28">Reg.Oznaka</label>
      <label className="xl:w-28 lg:w-28">Tehnicki</label>
      <label className="xl:w-28 lg:w-12">Placeno</label>
      <label className="w-36">Napomena</label>
    </div>
  );
}

export default TableHeader