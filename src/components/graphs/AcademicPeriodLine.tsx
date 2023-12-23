import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, RadialLinearScale, LineElement} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Line } from 'react-chartjs-2';

const AcademicPeriodLine = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, PointElement, BarElement, RadialLinearScale, LineElement);

    const pieOptions = {
        responsive: false,
        maintainAspectRatio: false,
        layout: {
          padding: {
              top: 20,
              left: 20,
              right: 20,
              bottom: 20
          }
        },
        scales: {},
        plugins: {
          tooltip: {
            enabled: false
          },
          legend: {
            display: true
          },
          datalabels: {
            align: "end",
            anchor: "end",
            offset: -75,
            font: {
              size: 13,
            },
            color: "#fff",
            formatter: (value: any, context: any) => {
              return value;
            }
          }
        }
      }

      const data = {
        labels: ['2020 1st', '2020 2nd', '2020 Summer','2021 1st', '2021 2nd', '2021 Summer', '2022 1st', '2022 2nd', '2022 Summer', '2023 1st', '2023 2nd', '2023 Summer'],
        datasets: [
            {
                label: 'Total Number of Enrollments Per Academic Period',
                data: [112,118,15,98,126,34,212,175,23,193,176,43],
                backgroundColor: ['#ffab00'],
                borderColor: ['#ffab00'],
            },
        ],
      };
    // @ts-ignore
    return <Line data={data} options={pieOptions} plugins={[ChartDataLabels]} width="1480" height="640"/>;
}

export default AcademicPeriodLine