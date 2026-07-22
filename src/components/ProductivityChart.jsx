import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ProductivityChart({ tasks }) {
  const completed = tasks.filter((t) => t.completed).length;
  const pending = tasks.length - completed;

  const data = {
    labels: [
      "Completed",
      "Pending",
    ],

    datasets: [
      {
        label: "Tasks",
        data: [completed, pending],
        borderRadius: 10,
        backgroundColor: [
          "#22c55e",
          "#ef4444",
        ],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#cbd5e1",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#cbd5e1",
          stepSize: 1,
        },

        grid: {
          color: "rgba(255,255,255,.08)",
        },
      },
    },
  };

  return (
    <Bar
      data={data}
      options={options}
    />
  );
}

export default ProductivityChart;