import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, RadialLinearScale, LineElement} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from 'react-chartjs-2';

const CoursesBar = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale, PointElement, BarElement, RadialLinearScale, LineElement);

    const options = {
        responsive: false,
        maintainAspectRatio: false,
        layout: {
          padding: {
              top: 0,
              left: 0,
              right: 0,
              bottom: 0
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
            offset: -30,
            font: {
              size: 13,
            },
            color: "#000",
            formatter: (value: any, context: any) => {
              return value;
            }
          }
        }
      }
    
    const data = {
        labels: ['BSIT', 'BSED', 'BSN', 'BSCS', 'BSHRM', 'MSED', 'MSHRM', 'BSSED', 'BSACC', 'BSCRIM'],
        datasets: [
            {
                label: 'Most Enrolled Courses',
                data: [18,28,47,94,124,12,18,25,77,46],
                backgroundColor: ['#81d4fa','#80deea','#80cbc4','#a5d6a7','#c5e1a5','#e6ee9c','#fff59d','#ffe082','#ffcc80','#ffab91','#a1887f']
            },
        ],
      };
    return (
        // @ts-ignore
        <Bar data={data} options={options} plugins={[ChartDataLabels]} width="700" height="450"/>
    )
}

export default CoursesBar;