import React from 'react';
import { Container } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../css/ChartReport.css';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

// Custom Legend Component
const CustomLegend = ({ labels, colors }) => {
  return (
    <div className="custom-legend">
      {labels.map((label, index) => (
        <div key={index} className="legend-item">
          <span
            className="legend-color"
            style={{
              backgroundColor: colors[index],
              display: 'inline-block',
              width: '12px',
              height: '12px',
              marginRight: '8px',
            }}
          ></span>
          <span className='label'>{label}</span>
        </div>
      ))}
    </div>
  );
};

const OverallReportsChart = () => {
  // Data for the chart
  const data = {
    labels: [
      'Discrete Enquiry',
      'Open Enquiry',
      'Radicalisation',
      'De-Radicalisation',
      'Lodged FIR',
      'Missing Enquiry',
      'Vital Installation',
      'ICP',
      'Madarsa',
    ],
    datasets: [
      {
        data: [110, 27, 39, 33, 150, 21, 60, 110, 20],
        backgroundColor: [
          '#E8EAF6',
          '#C5CAE9',
          '#9FA8DA',
          '#7986CB',
          '#5C6BC0',
          '#3F51B5',
          '#3949AB',
          '#303F9F',
          '#283593',
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the default legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: '#fff',
        formatter: (value) => {
          return value;
        },
        anchor: 'end',
        align: 'start',
        offset: 4,
        font: {
          weight: 'bold',
        },
      },
    },
    layout: {
      padding: {
        left: 100,
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
      },
    },
  };

  return (
    <Container className="bg-white p-4 shadow ChartContainer">
      <h4 className="mb-4">Overall Reports Generated</h4>
      <div style={{ display: 'flex' }}>
        {/* Chart Container */}
        <div style={{ width: '55%' }}>
          <Doughnut
            data={data}
            options={options}
            style={{
                boxSizing: 'border-box',
                display: 'block',
                height: '412px',
                width: '412px',
                position: 'relative',
            }}
          />
        </div>
        {/* Legend Container */}
        <div style={{ width: '30%', paddingLeft: '20px' }}>
          <CustomLegend labels={data.labels} colors={data.datasets[0].backgroundColor} />
        </div>
      </div>
    </Container>
  );
};

export default OverallReportsChart;

// // OverallReportsChart.js
// import React from 'react';
// import { Container } from 'react-bootstrap';
// import { Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import '../css/ChartReport.css';

// // Register Chart.js components
// ChartJS.register(Title, Tooltip, Legend, ArcElement, ChartDataLabels);

// const OverallReportsChart = () => {
//   // Data for the chart
//   const data = {
//     labels: [
//       'Discrete Enquiry',
//       'Open Enquiry',
//       'Radicalisation',
//       'De-Radicalisation',
//       'Lodged FIR',
//       'Missing Enquiry',
//       'Vital Installation',
//       'ICP',
//       'Madarsa'
//     ],
//     datasets: [
//       {
//         data: [110, 27, 39, 33, 150, 21, 60, 110, 20],
//         backgroundColor: [
//           '#E8EAF6',
//           '#C5CAE9',
//           '#9FA8DA',
//           '#7986CB',
//           '#5C6BC0',
//           '#3F51B5',
//           '#3949AB',
//           '#303F9F',
//           '#283593'
//         ],
//         borderColor: '#fff', // Optional: to add a border around each slice
//         borderWidth: 1
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'right',
//         labels: {
//           usePointStyle: true,
//           padding: 20, // Add padding between legend items
          
//           pointStyle: 'rect', // Use square bullets
//         },
//         padding: {
//           top: 20,  // Adjust padding to increase space at the top
//           right: 40, // Adjust padding to increase space on the right
//         }
//       },
//       tooltip: {
//         callbacks: {
//           label: (tooltipItem) => {
//             return `${tooltipItem.label}: ${tooltipItem.raw}`;
//           }
//         }
//       },
//       datalabels: {
//         display: true,
//         color: '#fff',
//         formatter: (value) => {
//           return value;
//         },
//         anchor: 'end',
//         align: 'start',
//         offset: 4,
//         font: {
//           weight: 'bold'
//         }
//       }
//     },
//     layout: {
//       padding: {
//         left: 100 // Add padding on the right side of the chart to make space for the legend
//       }
//     },
//     elements: {
//       arc: {
//         borderWidth: 2
//       }
//     }
//   };


//   return (
//     <Container className="bg-white p-4 shadow ChartContainer">
//       <h4 className="mb-4">Overall Reports Generated</h4>
//       <div style={{ width: '100%', height: '550px' }}>
//         <Doughnut data={data} options={options} style={{
//             boxSizing: 'border-box',
//             display: 'block',
//             height: '600px',
//             width: '600px',
//             position: 'absolute',
//             top: '-20px',
//         }}/>
//       </div>
//     </Container>
//   );
// };

// export default OverallReportsChart;