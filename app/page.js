"use client";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function TemperatureChart() {
  const [timeframe, setTimeframe] = useState("sec");
  const [temps, setTemps] = useState([20, 25, 23, 21, 24, 26, 28, 27, 29, 25, 22, 20]);
  const [humidity, setHumidity] = useState(60);
  const [motion, setMotion] = useState(false);
  const [message, setMessage] = useState("");

  const secData = {
    labels: temps.map((_, index) => `${index}s`),
    datasets: [
      {
        label: "Température Actuelle (°C)",
        data: temps,
        borderColor: "#6366F1", // Indigo-500
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const minData = {
    labels: temps.map((_, index) => `${index}min`),
    datasets: [
      {
        label: "Température Actuelle (°C)",
        data: temps.map((t) => Math.round(t * 0.95)),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const heureData = {
    labels: temps.map((_, index) => `${index}h`),
    datasets: [
      {
        label: "Température Actuelle (°C)",
        data: temps.map((t) => Math.round(t * 1.05)),
        borderColor: "#6366F1",
        backgroundColor: "rgba(99, 102, 241, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  let chartData;
  switch (timeframe) {
    case "min":
      chartData = minData;
      break;
    case "heure":
      chartData = heureData;
      break;
    default:
      chartData = secData;
      break;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "#E5E7EB" },
        beginAtZero: false,
        suggestedMin: 0,
        suggestedMax: 30,
      },
    },
  };

  const adjustTemp = (delta) => {
    setTemps((prev) => prev.map((t) => t + delta));
  };

  const feed = () => {
    setMessage("Nourriture donnée avec succès !");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-sm rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-800">Statistiques du Vivarium</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeframe("sec")}
            className={`text-sm px-3 py-1 rounded-full ${
              timeframe === "sec"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Par secondes
          </button>
          <button
            onClick={() => setTimeframe("min")}
            className={`text-sm px-3 py-1 rounded-full ${
              timeframe === "min"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Par minutes
          </button>
          <button
            onClick={() => setTimeframe("heure")}
            className={`text-sm px-3 py-1 rounded-full ${
              timeframe === "heure"
                ? "bg-indigo-500 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Par heures
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">Températures du vivarium</p>

      <div className="relative h-48">
        <Line data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h3 className="font-semibold text-gray-700">Humidité</h3>
          <p className="text-xl text-gray-900">{humidity}%</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4 text-center">
          <h3 className="font-semibold text-gray-700">Mouvement</h3>
          <p className="text-xl text-gray-900">{motion ? "Détecté" : "Aucun mouvement"}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={feed}
          className="px-6 py-3 bg-gray-400 hover:bg-gray-500 transition rounded-lg font-medium text-white"
        >
          Donner de la nourriture
        </button>
        <button
          onClick={() => adjustTemp(1)}
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 transition rounded-lg font-medium text-white"
        >
          Augmenter Température
        </button>
        <button
          onClick={() => adjustTemp(-1)}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 transition rounded-lg font-medium text-white"
        >
          Diminuer Température
        </button>
      </div>

      {message && (
        <div className="mt-4 text-center text-green-700 font-semibold">
          {message}
        </div>
      )}
    </div>
  );
}
