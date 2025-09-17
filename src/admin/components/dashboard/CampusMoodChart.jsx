import React from 'react';
import { TrendingUp } from 'lucide-react';

const CampusMoodChart = () => {
  // Sample data: value is the mood score, event is an optional annotation
  const moodData = [
    { day: 1, value: 7.1 }, { day: 2, value: 7.3 }, // ... and so on for 30 days
    { day: 14, value: 6.5, event: "Mid-term Exams Start" },
    { day: 21, value: 7.9, event: "Mid-term Exams End" },
    // ... more data points
  ];
  
  // Find min and max for scaling
  const maxValue = 10;
  const minValue = Math.min(...moodData.map(d => d.value)) - 1;

  // Function to create the SVG path for the line chart
  const createPath = () => {
    let pathD = `M 0,${100 - ((moodData[0].value - minValue) / (maxValue - minValue)) * 100}`;
    moodData.forEach((point, i) => {
      const x = (i / (moodData.length - 1)) * 100;
      const y = 100 - ((point.value - minValue) / (maxValue - minValue)) * 100;
      pathD += ` L ${x},${y}`;
    });
    return pathD;
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border col-span-1 md:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Campus Mood Index (30 Days)</h3>
        <div className="flex items-center text-sm text-green-600">
          <TrendingUp size={16} className="mr-1"/>
          <span>+5.2% from last period</span>
        </div>
      </div>
      <div className="relative h-64">
        {/* Line Chart using SVG */}
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Gradient Fill */}
          <defs>
            <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* The line */}
          <path d={createPath()} stroke="#3b82f6" strokeWidth="0.5" fill="none" />
          {/* The fill underneath */}
          <path d={createPath() + " L 100,100 L 0,100 Z"} fill="url(#moodGradient)" />
          
          {/* Event Annotations */}
          {moodData.filter(d => d.event).map((point, i) => {
            const x = (point.day - 1) / (moodData.length - 1) * 100;
            return (
              <g key={i}>
                <line x1={x} y1="0" x2={x} y2="100" stroke="#fb923c" strokeWidth="0.3" strokeDasharray="1,1" />
                <text x={x + 1} y="5" fill="#f97316" fontSize="3" className="font-semibold">{point.event}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default CampusMoodChart;