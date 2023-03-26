import React from "react";
import XLSX from "sheetjs-style";
import { HiDocumentDownload } from "react-icons/hi";
const Preuzmi = ({ arr, arr2, datum, agencije, vrste }) => {
  //STILOVI ZA EXCEL FILE
  const styleTabela = {
    border: {
      top: {
        style: "thick",
        color: "000000",
      },
      left: {
        style: "thick",
        color: "000000",
      },
      right: {
        style: "thick",
        color: "000000",
      },
      bottom: {
        style: "thick",
        color: "000000",
      },
    },
    alignment: {
      horizontal: "center",
    },
  };
  const styleJTabela = {
    border: {
      top: {
        style: "thick",
        color: "000000",
      },
      left: {
        style: "thick",
        color: "000000",
      },
      right: {
        style: "thick",
        color: "000000",
      },
      bottom: {
        style: "thick",
        color: "000000",
      },
    },
  };
  const styleBTabela = {
    font: {
      bold: true,
    },
    border: {
      top: {
        style: "thick",
        color: "000000",
      },
      left: {
        style: "thick",
        color: "000000",
      },
      right: {
        style: "thick",
        color: "000000",
      },
      bottom: {
        style: "thick",
        color: "000000",
      },
    },
    alignment: {
      horizontal: "center",
    },
  };
  const styleBTabelaTop = {
    font: {
      bold: true,
      sz: 14
    },
    border: {
      top: {
        style: "thick",
        color: "000000",
      },
    },
    alignment: {
      horizontal: "center",
    },
  };
  const styleBNaslov = {
    font: {
      bold: true,
      sz: 18,
    },
    alignment: {
      horizontal: "center",
    },
  };
  

  const exportToExcel = async () => {
    //OBRADA PODATAKA ZA IMPORT
    const redovi = arr.map((red) => {
      const { num, agencija, marka, vrsta, reg, tehnicki, placeno, napomena } =
        red;
      let vozilo = agencija + " " + marka;
      return {
        br: num,
        VOZILO: vozilo,
        REG_OZNAKA: reg,
        TEHNICKI: tehnicki,
        PLACENO: placeno,
        NAPOMENA: napomena,
      };
    });

    //STILIZOVANJE NASLOVA
    let str = `SPECIFIKACIJA NA DAN: ${datum[0]}.${datum[1]}.${datum[2]}`;
    const naslov = [[str]];
    const wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(redovi, { origin: "B4" });
    XLSX.utils.sheet_add_aoa(ws, naslov, { origin: "D2" });
    ws["D2"].s = styleBNaslov;
    ws["B4"].s = styleBTabela;
    ws["C4"].s = styleBTabela;
    ws["D4"].s = styleBTabela;
    ws["E4"].s = styleBTabela;
    ws["F4"].s = styleBTabela;
    ws["G4"].s = styleBTabela;

    // STILIZOVANJE TABELE
    let j = 5;
    for (let i = 0; i < arr.length; i++) {
      ws["B" + j].s = styleTabela;
      ws["C" + j].s = styleJTabela;
      ws["D" + j].s = styleTabela;
      ws["E" + j].s = styleTabela;
      ws["F" + j].s = styleTabela;
      ws["G" + j].s = styleTabela;
      j = j + 1;
    }
    //BROJKE SA LEVE STRANE
    for (let i = 0; i < arr.length; i++) {
      XLSX.utils.sheet_add_aoa(ws, [[`${i + 1}`]], { origin: "A" + (i + 5) });
    }

    let origin = arr.length + 8;

    for (let i = 0; i < agencije.length; i++) {
      //if(agencije[i].label === 'P.T.P.') continue;
      // Naslov tabele za Agencije
      XLSX.utils.sheet_add_aoa(ws, [[agencije[i].label]], {
        origin: "C" + origin,
      });
      origin += 1;
      var tabela = [];

      for (let j = 0; j < vrste.length; j++) {
        let zbir = 0;
        let tehnicki = 0;
        let placeno = 0;
        for (let k = 0; k < arr.length; k++) {
          if (
            arr[k].agencija === agencije[i].label &&
            arr[k].vrsta === vrste[j].label
          ) {
            zbir += 1;
            tehnicki += arr[k].tehnicki;
            placeno += parseInt(arr[k].placeno);
          }
        }
        tabela.push({
          Tip: vrste[j].label,
          Ukupno: zbir,
          Tehnicki: tehnicki,
          Placeno: placeno,
        });
      }
      XLSX.utils.sheet_add_json(ws, tabela, {
        origin: "C" + origin,
      });
      ws["C" + (origin - 1)].s = styleBNaslov;
      for (let x = 0; x <= tabela.length; x++) {
        ws["C" + (origin + x)].s = styleBTabela;
        if (x === 0) {
          ws["D" + (origin + x)].s = styleBTabela;
          ws["E" + (origin + x)].s = styleBTabela;
          ws["F" + (origin + x)].s = styleBTabela;
        } else {
          ws["D" + (origin + x)].s = styleTabela;
          ws["E" + (origin + x)].s = styleTabela;
          ws["F" + (origin + x)].s = styleTabela;
        }
      }
      let sveUkupno = 0;
      let sveTehnicki = 0;
      let svePlaceno = 0;
      for (let l = 0; l < tabela.length; l++) {
        sveUkupno += tabela[l].Ukupno;
        sveTehnicki += tabela[l].Tehnicki;
        svePlaceno += parseInt(tabela[l].Placeno);
      }

      origin += vrste.length + 1;

      let sve = [["Zbir", sveUkupno, sveTehnicki, svePlaceno]];
      XLSX.utils.sheet_add_aoa(ws, sve, {
        origin: "C" + origin,
      });

      ws["C" + origin].s = styleBTabelaTop;
      ws["D" + origin].s = styleBTabelaTop;
      ws["E" + origin].s = styleBTabelaTop;
      ws["F" + origin].s = styleBTabelaTop;
      

      origin += 2;
    }

    //VREDNOSTI ZA TEHNICKI I PLACENO
    let tehPla = [];
    let tehnicki = 0;
    for (let i = 0; i < arr.length; i++) {
      tehnicki = tehnicki + arr[i].tehnicki;
    }
    let placeno = 0;
    for (let i = 0; i < arr.length; i++) {
      placeno = placeno + parseInt(arr[i].placeno);
    }
    tehPla.push(["TEHNICKI", tehnicki]);
    tehPla.push(["PLACENO", placeno]);

    origin = arr.length + 6;
    XLSX.utils.sheet_add_aoa(ws, tehPla, { origin: "F" + origin });
    for (let i = 0; i < 2; i++) {
      ws["F" + origin].s = styleBTabela;
      ws["G" + origin].s = styleTabela;
      origin = origin + 1;
    }

    var wscols = [
      { wpx: 20 },
      { wpx: 50 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 65 },
      { wpx: 65 },
      { wpx: 100 },
    ];
    ws["!cols"] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, `${datum[0]}.${datum[1]}.${datum[2]}`);
    XLSX.writeFile(wb, `${datum[0]}-${datum[1]}-${datum[2]}` + ".xlsx");
  };

  return (
    <div>
      <button
        onClick={exportToExcel}
        className="py-2 px-5 text-white rounded bg-green-500 hover:bg-green-400 flex justify-center place-items-center"
      >
        <HiDocumentDownload size={20} />
        Preuzmi
      </button>
    </div>
  );
};

export default Preuzmi;
