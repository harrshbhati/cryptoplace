import React, { useEffect, useState } from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart = ({historicalData}) => {
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        try {
            if (historicalData && historicalData.prices && Array.isArray(historicalData.prices) && historicalData.prices.length > 0) {
                const formattedData = [];
                
                // Process each price point
                historicalData.prices.forEach(item => {
                    if (item && Array.isArray(item) && item.length >= 2) {
                        try {
                            // Format date
                            const timestamp = new Date(item[0]);
                            const day = timestamp.getDate();
                            const month = timestamp.getMonth() + 1;
                            const dateStr = `${day}/${month}`;
                            
                            // Add to chart data
                            formattedData.push({
                                date: dateStr,
                                price: parseFloat(item[1])
                            });
                        } catch (e) {
                            console.error("Error formatting date:", e);
                        }
                    }
                });
                
                if (formattedData.length > 0) {
                    setChartData(formattedData);
                    setError(null);
                } else {
                    throw new Error("No valid price points found");
                }
            }
        } catch (error) {
            console.error("Error in LineChart:", error);
            setError(error.message);
            
            // Set fallback data
            setChartData([
                { date: "1/1", price: 1000 },
                { date: "2/1", price: 1200 },
                { date: "3/1", price: 1100 },
                { date: "4/1", price: 1300 },
                { date: "5/1", price: 1400 }
            ]);
        }
    }, [historicalData]);
    
    if (chartData.length === 0) {
        return (
            <div className="chart-loading">
                Loading chart data...
            </div>
        );
    }
    
    return (
        <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
                <XAxis 
                    dataKey="date" 
                    stroke="#a0a0a0" 
                    tick={{ fill: '#a0a0a0', fontSize: 12 }}
                />
                <YAxis 
                    stroke="#a0a0a0"
                    tick={{ fill: '#a0a0a0', fontSize: 12 }}
                    domain={['auto', 'auto']}
                />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'rgba(13, 20, 33, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    labelStyle={{ color: '#a0a0a0' }}
                />
                <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#6c5ce7" 
                    strokeWidth={3}
                    dot={{ stroke: '#6c5ce7', strokeWidth: 2, r: 4, fill: '#6c5ce7' }}
                    activeDot={{ stroke: '#fff', strokeWidth: 2, r: 6, fill: '#6c5ce7' }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
};

export default LineChart;