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
    labels: ["Completed", "Pending"],
    datasets: [
      {
        label: "Tasks",
        data: [completed, pending],
      },
    ],
  };

  return <Bar data={data} />;
}

export default ProductivityChart;