import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, RadialLinearScale, LineElement} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from 'react-chartjs-2';

const YearLevelPie = () => {
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
        labels: ['1st Yr', '2nd Yr', '3rd Yr', '4th Yr'],
        datasets: [
            {
                label: 'Year Level',
                data: [50,48,44,70],
                backgroundColor: [
                    '#558b2f',
                    '#b71c1c',
                    '#004aad',
                    '#ffab00',
                  ],
                  borderColor: [
                    '#ffffff',
                    '#ffffff',
                    '#ffffff',
                    '#ffffff',
                  ],
            },
        ],
      };

    // @ts-ignore
    return <Pie data={data} options={pieOptions} plugins={[ChartDataLabels]} width="380" height="460"/>;
}

export default YearLevelPie