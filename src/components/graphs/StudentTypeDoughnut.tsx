import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, BarElement, RadialLinearScale, LineElement} from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Doughnut } from 'react-chartjs-2';

const StudentTypeDoughnut = () => {
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
              const datapoints = context.chart.data.datasets[0].data;
              const totalSum = (total: any, datapoint: any) => {
                return total + datapoint;
              }
              const totalValue = datapoints.reduce(totalSum, 0);
              const percentageValue = (value / totalValue * 100).toFixed(0);
              if((value / totalValue * 100) > 0){
                return value + "  (" +percentageValue + "%)";
              }
              return '';
            }
          }
        }
      }
    
    const data = {
        labels: ['Old Student', 'New Student'],
        datasets: [
            {
                label: 'Old VS New',
                data: [144,68],
                backgroundColor: ['#558b2f','#e65100']
            },
        ],
      };

    // @ts-ignore
    return <Doughnut data={data} options={pieOptions} plugins={[ChartDataLabels]} width="364" height="400"/>
}

export default StudentTypeDoughnut;