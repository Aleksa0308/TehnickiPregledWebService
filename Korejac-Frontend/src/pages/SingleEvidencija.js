import React, { useEffect, useState } from "react";
import Select from "react-select";
import Zapis from "../components/Zapis";
import "react-datepicker/dist/react-datepicker.css";
import Preuzmi from "../components/Preuzmi";
import Sacuvaj from "../components/Sacuvaj";
import TableHeader from "../components/TableHeader";
import  Adresa  from "../ipadresa"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const SingleEvidencija = () => {
  let datum = window.location.pathname.split("/").pop();
  datum = datum.split("-");
  let month = datum[1];
  let day = datum[0];
  let year = datum[2];
  const token = document.cookie;
  const [date, setDate] = useState("");

  

  const [agencije, setAgencije] = useState([]);
  const [marke, setMarke] = useState([]);
  const [vrste, setVrste] = useState([]);
  const [cene, setCene] = useState([]);
  const [specifikacija, setSpecifikacija] = useState([]);
  const [zapisnici, updateZapisnici] = useState(specifikacija)
  const [total, setTotal] = useState(0);
  const [postojeci, setPostojeci] = useState([]);
  const [previous, setPrevious] = useState(0);

  const [formReg, setFormReg] = useState("");
  const [formNap, setFormNap] = useState("");
  const [formAgen, setFormAgen] = useState("");
  const [formMarka, setFormMarka] = useState("");
  const [formVrsta, setFormVrsta] = useState("");
  const [formPlacen, setFormPlacen] = useState(false);

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getPostojeci = async () => {
    const response = await fetch(
      Adresa.adresa + `:8080/api/evidencije/${day}-${month}-${year}`,
      requestOptions
    );
    const data = await response.json();
    const postojeci = data.map((postojeci) => {
      const { num, agencija, marka, vrsta, reg, tehnicki, placeno, napomena } =
        postojeci;
      return {
        num: num,
        agencija: agencija,
        marka: marka,
        vrsta: vrsta,
        reg: reg,
        tehnicki: tehnicki,
        placeno: placeno,
        napomena: napomena,
        flag: true
      };
    });
    setPostojeci(postojeci);
    setDate(`${year}-${month}-${day}`);
    setSpecifikacija(postojeci);
  };

  const getAgencije = async () => {
    const response = await fetch(
      Adresa.adresa + ":8080/api/agencije",
      requestOptions
    );
    const data = await response.json();
    const agencije = data.map((agencija) => {
      const { name } = agencija;
      return { value: name, label: name };
    });
    setAgencije(agencije);
  };
  const getMarke = async () => {
    const response = await fetch(
      Adresa.adresa + ":8080/api/marke",
      requestOptions
    );
    const data = await response.json();
    const marke = data.map((marka) => {
      const { name } = marka;
      return { value: name, label: name };
    });
    setMarke(marke);
  };
  const getVrste = async () => {
    const response = await fetch(
      Adresa.adresa + ":8080/api/vrste",
      requestOptions
    );
    const data = await response.json();
    const cene = data.map((cena) => {
      const { name, price } = cena;
      return { name: name, price: price };
    });
    setCene(cene);

    const vrste = data.map((vrsta) => {
      const { name } = vrsta;
      return { value: name, label: name };
    });
    setVrste(vrste);
  };

  const getTotal = async () => {
    const response = await fetch(
      Adresa.adresa + ":8080/api/evidencije/total",
      requestOptions
    );
    const data = await response.json();
    setTotal(data);
  };

  const getPrevious = async () => {
    const response = await fetch(
      Adresa.adresa + `:8080/api/evidencije/previous/${year}-${month}-${day}`,
      requestOptions
    );
    const res = await response.json();
    setPrevious(res.prev);
  };

  useEffect(() => {
    getAgencije();
    getMarke();
    getVrste();
    getTotal();
    getPostojeci();
    getPrevious();
  }, []);

  const agencijaChange = (selectedOption) => {
    setFormAgen(selectedOption.value);
  };
  const markaChange = (selectedOption) => {
    setFormMarka(selectedOption.value);
  };
  const vrstaChange = (selectedOption) => {
    setFormVrsta(selectedOption.value);
  };
  const getFormReg = (event) => {
    const regValue = event.target.value;
    setFormReg(regValue);
  };
  const getFormNap = (event) => {
    const napValue = event.target.value;
    setFormNap(napValue);
  };
  const getFormPlacen = (event) => {
    const placenValue = event.target.checked;
    setFormPlacen(placenValue);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let cena = cene.find((cena) => cena.name === formVrsta);
    let placeno;
    if (formPlacen) {
      placeno = cena.price;
    } else {
      placeno = 0;
    }
    //Konfigurisanje num-a u zavisnosti da li je neki prethodni dan ili sadasnjost
    let last = specifikacija.length;
    let x = 0;
    if (last === 0) {
      x = total;
    } else {
      x = specifikacija[last - 1].num;
      x = Math.min(x, total);
    }
    if (previous === 0 && total > 0 && last === 0) {
      x = 0;
    }
    if (last === 0 && previous !== 0) {
      x = previous;
    }

    let num = x + 1;
    setTotal(num);
    const zapis = {
      num: num,
      agencija: formAgen,
      marka: formMarka,
      vrsta: formVrsta,
      reg: formReg,
      tehnicki: cena.price,
      placeno: placeno,
      napomena: formNap,
      flag: false
    };
    setSpecifikacija((spec) => {
      return [...spec, zapis];
    });
    setFormReg("");
    setFormNap("");
    setFormPlacen(false);
  };
  const changeDate = (e) => {
    let x = e.target.value;
    setDate(x);
    let tmp = x.split("-");
    window.location.replace(
      Adresa.adresa + `:3000/evidencija/${tmp[2]}-${tmp[1]}-${tmp[0]}`
    );
  };

  const deleteZap = (num) => {
    let tmp = specifikacija;
    const filteredTmp = tmp.filter((t) => t.num !== num);

    const updateTmp = filteredTmp.map((i) => {
      if (i.num > num) {
        return { ...i, num: i.num - 1 };
      }
      return i;
    });

    setSpecifikacija(updateTmp);
  };
  const deletePost = (num) => {
    let tmp = postojeci;
    const filteredTmp = tmp.filter((t) => t.num !== num);

    const updateTmp = filteredTmp.map((i) => {
      if (i.num > num) {
        return { ...i, num: i.num - 1 };
      }
      return i;
    });

    setPostojeci(updateTmp);

    deleteZap(num);
  };

  const editValues = (
    num,
    agencija,
    marka,
    reg,
    tehnicki,
    placeno,
    napomena
  ) => {
    let tmp = specifikacija;
    let x = tmp.findIndex((z) => z.num === num);
    let vrsta = { name: "" };
    vrsta = cene.filter((c) => c.price == tehnicki);
    let izbor = "";
    let flag = true;
    let flag2 = true;
    if (vrsta.length > 1) {
      let str = "";
      for (let i = 0; i < vrsta.length; i++) {
        if (i === 0) {
          str = vrsta[i].name;
        } else {
          str = str + ", " + vrsta[i].name;
        }
      }
      while (flag) {
        izbor = prompt(`Upisite izmenjenu vrstu vozila: (${str})`, "");
        let sadrzi = cene.some((c) => c.name === izbor);
        if (sadrzi) {
          flag = false;
          if (!(placeno == 0)) {
            placeno = tehnicki;
          }
        }
      }
    } else if (vrsta.length === 1) {
      izbor = vrsta[0].name;
      if (!(placeno == 0)) {
        placeno = tehnicki;
      }
    } else if (vrsta.length === 0) {
      while (flag2) {
        tehnicki = prompt(
          "Uneli ste ne postojecu vrednost!\nProbajte ponovo:",
          ""
        );
        vrsta = cene.filter((c) => c.price == tehnicki);
        izbor = "";
        let flag = true;
        if (vrsta.length > 1) {
          let str = "";
          for (let i = 0; i < vrsta.length; i++) {
            if (i === 0) {
              str = vrsta[i].name;
            } else {
              str = str + ", " + vrsta[i].name;
            }
          }
          while (flag) {
            izbor = prompt(`Upisite izmenjenu vrstu vozila: (${str})`, "");
            let sadrzi = cene.some((c) => c.name === izbor);
            if (sadrzi) {
              flag = false;
              flag2 = false;
              if (!(placeno == 0)) {
                placeno = tehnicki;
              }
            }
          }
        } else if (vrsta.length === 1) {
          izbor = vrsta[0].name;
          flag2 = false;
          if (!(placeno == 0)) {
            placeno = tehnicki;
          }
        }
      }
    }

    tmp[x].agencija = agencija;
    tmp[x].marka = marka;
    tmp[x].vrsta = izbor;
    tmp[x].reg = reg;
    tmp[x].tehnicki = parseInt(tehnicki);
    tmp[x].placeno = placeno;
    tmp[x].napomena = napomena;
    tmp[x].flag = false;
    console.log("tmp:", tmp[x]);
    setSpecifikacija((tmp) => {
      return [...tmp];
    });
  };

 const handleOnDragEng = (result) => {
    if(!result.destination) return
    const tmp = specifikacija
    const [reorderedItem] = tmp.splice(result.source.index, 1)
    tmp.splice(result.destination.index, 0, reorderedItem)
    if(result.destination.index < result.source.index){
      const raz = result.source.index - result.destination.index 
      tmp[result.destination.index ].num = tmp[result.destination.index ].num - raz
      tmp[result.destination.index].flag = false
      for(let i = result.destination.index + 1; i<tmp.length; i++){
        tmp[i].flag = false
        tmp[i].num = tmp[i].num + 1
      }
    }else if(result.destination.index > result.source.index){
      const raz = result.destination.index - result.source.index 
      tmp[result.destination.index ].num = tmp[result.destination.index ].num + raz
      tmp[result.destination.index].flag = false
      for(let i = result.source.index; i<result.destination.index; i++){
        tmp[i].flag = false
        tmp[i].num = tmp[i].num - 1
      }
    }
  }

  return (
    <div className="flex flex-col items-center  xl:px-12 lg:px-2 ">
      <div>
        <div className="text-2xl font-bold lg:text-lg xl:text-2xl absolute  2xl:left-72 xl:left-64  lg:left-64 top-8">
          Evidencija za:
          <input
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={changeDate}
            className="p-2 rounded ml-2 ring-2"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 xl:mx-4 2xl:mx-32 lg:mx-16 mt-24 mb-4">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-7 xl:gap-4 lg:gap-2 lg:text-sm xl:text-md place-items-stretch"
        >
          <div className="">
            <label>Agencija</label>
            <Select options={agencije} onChange={agencijaChange} required />
          </div>
          <div className="">
            <label>Marka</label>
            <Select options={marke} onChange={markaChange} required />
          </div>
          <div className="">
            <label>Vrsta</label>
            <Select options={vrste} onChange={vrstaChange} required />
          </div>
          <div className="">
            <label>Reg.Oznaka</label>
            <input
              type="text"
              required
              placeholder="Reg.Oznaka..."
              onChange={getFormReg}
              value={formReg}
              className="bg-white border border-gray-300 rounded lg:w-28 xl:w-32 p-2 focus:outline-none text-gray-600"
            />
          </div>
          <div className="pt-5 pl-3 flex items-center ">
            <input
              type="checkbox"
              name="Placeno"
              checked={formPlacen}
              onChange={getFormPlacen}
              id="placeno"
              className="w-5 h-5"
            />
            <label className="ml-2">Placeno</label>
          </div>
          <div className="">
            <label>Napomena</label>
            <input
              type="text"
              placeholder="Napomena..."
              onChange={getFormNap}
              value={formNap}
              className="bg-white border border-gray-300 rounded lg:w-28 xl:w-32 p-2 focus:outline-none text-gray-600"
            />
          </div>
          <div className="mt-5 inline-flex items-center">
            <input
              type="submit"
              className=" cursor-pointer bg-blue-700 rounded text-white text-sm xl:px-8 xl:py-2 lg:px-4 lg:py-2 ml-4 hover:bg-blue-600"
              value="+ Dodaj"
            ></input>
          </div>
        </form>
      </div>
      <div>
        {specifikacija.length ? <TableHeader /> : ""}
        <DragDropContext onDragEnd={handleOnDragEng}>
          <Droppable droppableId="zapisnici">
            { (provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
                {specifikacija.map((post, index) => {
                  return (
                    <Draggable key={post.num} draggableId={String(post.num)} index={index}>
                      {(provided) => (
                        <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <Zapis
                              zap={post}
                              deleteZap={deletePost}
                              edit={editValues}
                              flag={post.flag}
                            />
                        </div>
                )}
                    </Draggable>
                       );
                })}
                {provided.placeholder}
            </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="mr-16 mt-8 flex mb-20">
        <Sacuvaj arr={specifikacija} date={date} />
        <Preuzmi
          arr={specifikacija}
          arr2={agencije}
          datum={datum}
          agencije={agencije}
          vrste={vrste}
        />
      </div>
    </div>
  );
};

export default SingleEvidencija;
