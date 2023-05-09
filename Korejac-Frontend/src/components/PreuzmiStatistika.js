import React from "react";
import XLSX from "sheetjs-style";
import { HiDocumentDownload } from "react-icons/hi";
const PreuzmiStatistika = ({ datum, data, ukupno, tehnicki, placeno }) => {
  const dvaDatuma = datum.split("&");
  let datum1 = dvaDatuma[0].split("-");
  let datum2 = dvaDatuma[1].split("-");
  datum1 = `${datum1[0]}.${datum1[1]}.${datum1[2]}`;
  datum2 = `${datum2[0]}.${datum2[1]}.${datum2[2]}`;

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
      sz: 14,
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
      sz: 14,
    },
  };

  const exportToExcel = async () => {
    //STILIZOVANJE NASLOVA
    let str = `STATISTIKA ZA PERIOD OD ${datum1} DO ${datum2}`;
    const naslov = [[str]];
    const wb = XLSX.utils.book_new();
    let ws = XLSX.utils.aoa_to_sheet(naslov, { origin: "B2" });
    ws["B2"].s = styleBNaslov;
    XLSX.utils.sheet_add_aoa(ws, [["Ukupno:", ukupno]], { origin: "B4" });
    ws["B4"].s = styleBTabela;
    ws["C4"].s = styleTabela;

    XLSX.utils.sheet_add_aoa(ws, [["Tehnicki:", tehnicki]], { origin: "F4" });
    XLSX.utils.sheet_add_aoa(ws, [["Placeno:", placeno]], { origin: "F5" });
    ws["F4"].s = styleBTabela;
    ws["G4"].s = styleTabela;
    ws["F5"].s = styleBTabela;
    ws["G5"].s = styleTabela;

    let origin = 6;
    for (let i = 0; i < data.length; i++) {
      origin += 1;
      XLSX.utils.sheet_add_aoa(ws, [[data[i].agencija]], {
        origin: "C" + (origin),
      });
      ws["C" + (origin)].s = styleBNaslov;
      origin += 1
      XLSX.utils.sheet_add_aoa(ws, [['Vrsta', 'Ukupno', 'Tehnicki', 'Placeno']], {
        origin: "C" + (origin),
      });
      ws["C" + origin].s = styleBTabela;
      ws["D" + origin].s = styleBTabela;
      ws["E" + origin].s = styleBTabela;
      ws["F" + origin].s = styleBTabela;
      for(let j = 0; j<data[i].data.length - 1; j++){
        origin += 1
        XLSX.utils.sheet_add_aoa(
          ws,
          [
            [
              data[i].data[j].vrsta,
              data[i].data[j].total,
              data[i].data[j].totalTehnicki,
              data[i].data[j].totalPlaceno,
            ],
          ],
          { origin: "C" + (origin) }
        );
        ws["C" + origin].s = styleBTabela;
        ws["D" + origin].s = styleTabela;
        ws["E" + origin].s = styleTabela;
        ws["F" + origin].s = styleTabela;
      }
      origin += 1;
      XLSX.utils.sheet_add_aoa(
        ws,
        [
          [
            "Zbir",
            data[i].data[data[i].data.length-1].sumUkupno,
            data[i].data[data[i].data.length-1].sumTehnicki,
            data[i].data[data[i].data.length-1].sumPlaceno,
          ],
        ],
        {
          origin: "C" + (origin),
        }
      );
      ws["C" + origin].s = styleBTabela;
      ws["D" + origin].s = styleBTabela;
      ws["E" + origin].s = styleBTabela;
      ws["F" + origin].s = styleBTabela;
      origin += 1;
    }

    var wscols = [
      { wpx: 20 },
      { wpx: 50 },
      { wpx: 50 },
      { wpx: 50 },
      { wpx: 50 },
      { wpx: 50 },
      { wpx: 50 },
    ];
    ws["!cols"] = wscols;
    XLSX.utils.book_append_sheet(wb, ws, `${datum1} do ${datum2}`);
    XLSX.writeFile(wb, `${datum1} do ${datum2}` + ".xlsx");
  };

  return (
    <div>
      <button
        onClick={exportToExcel}
        className="py-2 px-5 text-white text-lg rounded bg-green-500 hover:bg-green-400 flex justify-center place-items-center"
      >
        <HiDocumentDownload size={20} />
        Preuzmi
      </button>
    </div>
  );
};

export default PreuzmiStatistika;
