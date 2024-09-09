import React, { useEffect, useState } from 'react';
import { basepath } from "../../config";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

import "../../css/HomageCSS/OverallReports.css"

const COLORS = ['#17356B', '#1E458C', '#2759B5', '#3272E8', '#377DFF', '#5F97FF', '#A3C3FF', '#C1D7FF', '#EBF2FF']

const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {value}
        </text>
    );
};

const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: entry.color,
              borderRadius: '50%',
              marginRight: '8px'
            }}></span>
            <span style={{ color: 'lightgray' }}>{entry.value}</span>
          </li>
        ))}
      </ul>
    );
  };

export default function OverallReports({userDetails}) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(basepath() + `/overall_reports`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userDetails.email
                    }),
                });
                const data = await response.json();
                setData(data.data);
                console.log(data,"data of over all reports")

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // useEffect(() => {
    //     setData([
    //         { "name": "Discrete Enquiry", "value": 110 },
    //         { "name": "Open Enquiry", "value": 27 },
    //         { "name": "Radicalisation", "value": 39 },
    //         { "name": "De-Radicalisation", "value": 33 },
    //         { "name": "Lodged FIR", "value": 150 },
    //         { "name": "Missing Enquiry", "value": 21 },
    //         { "name": "Vital Installation", "value": 60 },
    //         { "name": "ICP", "value": 110 },
    //         { "name": "Madarsa", "value": 2 }
    //     ])
    // }, []);
    return (
        <>
            <div className='overall-reports-header'>
                <div>Overall Reports Generated</div>
                <div>this week</div>
            </div>
            <div class="overall-grid-container">
                <div>
                    <PieChart width={600} height={350}>
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="enquiry_type"
                            cx="50%"
                            cy="50%"
                            startAngle={135}    // Start from the top
                            endAngle={495}    // Ensure a full circle in the clockwise direction
                            innerRadius={60}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={1}
                            label={renderCustomLabel} // Use custom label
                            labelLine={false} // Disable lines pointing outside
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend
                            layout="vertical"
                            align="right"
                            // margin={200}
                            verticalAlign="middle"
                            content={renderLegend} // Use custom legend renderer
                        />
                    </PieChart>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}
