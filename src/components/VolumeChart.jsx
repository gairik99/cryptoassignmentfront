import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
    zoomPlugin
);

const VolumeChart = ({ volume, days }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!volume || volume.length === 0) return;

        // Helper function to check if a timestamp is during market hours
        const isMarketOpenTime = (timestamp) => {
            const date = new Date(timestamp);
            const day = date.getDay(); // 0 = Sunday, 6 = Saturday
            const hours = date.getHours();
            const minutes = date.getMinutes();

            // Market is open Monday–Friday, 9:30 AM to 4:00 PM
            const isWeekday = day >= 1 && day <= 5;
            const isOpenHour = (hours > 9 || (hours === 9 && minutes >= 30)) && hours < 16;

            return isWeekday && isOpenHour;
        };

        // Filter + format data
        const formattedData = volume
            .filter(([timestamp]) => isMarketOpenTime(timestamp))
            .map(([timestamp, value]) => ({
                x: new Date(timestamp),
                y: value / 1_000_000, // Convert to millions
            }));

        setChartData({
            datasets: [
                {
                    label: 'Volume (in millions)',
                    data: formattedData,
                    backgroundColor: 'rgba(28, 110, 46, 0.6)',
                    borderRadius: 2,
                    barPercentage: 1.0,
                    categoryPercentage: 1.0,
                },
            ],
        });
    }, [volume]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `Volume: ${ctx.parsed.y.toLocaleString()}M`,
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl',
                },
                zoom: {
                    wheel: { enabled: true },
                    pinch: { enabled: true },
                    mode: 'x',
                },
                limits: {
                    x: { minRange: 1000 * 60 * 60 }, // 1 hour min zoom range
                },
            },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: days > 7 ? 'day' : 'hour',
                    tooltipFormat: 'DD MMM YYYY HH:mm',
                    displayFormats: {
                        hour: 'HH:mm',
                        day: 'DD MMM',
                    },
                },
                grid: { display: false },
                ticks: {
                    source: 'auto',
                    maxRotation: 0,
                    autoSkip: true,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Volume (M)',
                },
                grid: { color: '#e0e0e0' },
            },
        },
    };

    return (
        <div style={{ height: '200px', width: '100%' }}>
            {chartData ? (
                <Chart type="bar" data={chartData} options={options} />
            ) : (
                <p>Loading volume chart...</p>
            )}
        </div>
    );
};

export default VolumeChart;
