import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
    LineController,
    Filler,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { Chart } from 'react-chartjs-2';
import 'chartjs-adapter-luxon';

// Register chart components
ChartJS.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale,
    TimeScale,
    Tooltip,
    Legend,
    Filler,
    zoomPlugin
);

const PriceChart = ({ price, days }) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        if (!price || price.length === 0) return;

        // Filter data to include only market hours (Mon-Fri, 9:30am–4:00pm)
        const isMarketOpenTime = (timestamp) => {
            const date = new Date(timestamp);
            const day = date.getDay(); // 0 = Sun, 6 = Sat
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const isWeekday = day >= 1 && day <= 5;
            const isMarketHours =
                (hours > 9 || (hours === 9 && minutes >= 30)) && hours < 16;
            return isWeekday && isMarketHours;
        };

        const formattedData = price
            .filter(([timestamp]) => isMarketOpenTime(timestamp))
            .map(([timestamp, value]) => ({
                x: new Date(timestamp),
                y: value,
            }));

        setChartData({
            datasets: [
                {
                    label: 'Price',
                    data: formattedData,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.2)',
                    fill: true,
                    pointRadius: 0,
                    tension: 0.2,
                },
            ],
        });
    }, [price]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) => `Price: $${ctx.parsed.y.toFixed(2)}`,
                },
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'x',
                    modifierKey: 'ctrl',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: 'x',
                },
                limits: {
                    x: { minRange: 1000 * 60 * 60 }, // at least 1 hour
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
                ticks: {
                    source: 'auto',
                    maxRotation: 0,
                    autoSkip: true,
                },
                grid: { display: false },
            },
            y: {
                beginAtZero: false,
                title: { display: true, text: 'Price (USD)' },
                grid: { color: '#e0e0e0' },
            },
        },
    };

    return (
        <div style={{ height: '300px', width: '100%' }}>
            {chartData ? (
                <Chart type="line" data={chartData} options={options} />
            ) : (
                <p>Loading chart...</p>
            )}
        </div>
    );
};

export default PriceChart;
