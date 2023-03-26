import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip } from "chart.js/auto";

const DoughnutStat = ({ datum, tot }) => {
  const token = document.cookie;
  const [data, setData] = useState({
    labels: [""],
    datasets: [{ label: "", data: 0 }],
  });

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getData = async () => {
    const response = await fetch(
      `http://localhost:8080/api/statistika/agencije/${datum}`,
      requestOptions
    );
    const data = await response.json();
    setData(data.config);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="p-4 bg-white rounded w-80">
      <h1 className="text-xl font-bold">
        Ukupno vozila: <span className="text-2xl text-blue-500 p-2">{tot}</span>
      </h1>
      <Doughnut
        data={data}
        options={{
          plugins: {
            tooltip: {
              titleFont: { size: 18 },
              bodyFont: { size: 18 },
            },
            legend: {
              labels: { font: { size: 14, weight: "bold" } },
            },
          },
        }}
      />
      <div></div>
    </div>
  );
};

export default DoughnutStat;
