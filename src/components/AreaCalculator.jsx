import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AreaCalculator = () => {
  const [fromValue, setFromValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('sqm');
  const [toUnit, setToUnit] = useState('sqft');
  const [convertedValue, setConvertedValue] = useState(10.76391);
  const [chartType, setChartType] = useState('bar');
  const [popularConversions, setPopularConversions] = useState([]);

  const units = [
    { value: 'sqm', label: 'Square Meter (sq m)', icon: '📏' },
    { value: 'sqft', label: 'Square Feet (sq ft)', icon: '🏠' },
    { value: 'acre', label: 'Acre', icon: '🌾' },
    { value: 'hectare', label: 'Hectare', icon: '🌳' },
    { value: 'bigha', label: 'Bigha', icon: '🏡' },
    { value: 'cent', label: 'Cent', icon: '📍' },
    { value: 'sqyd', label: 'Square Yard (sq yd)', icon: '🏟️' }
  ];

  const SQM_PER_UNIT = {
    sqm: 1,
    sqft: 0.09290304,
    sqyd: 0.83612736,
    acre: 4046.8564224,
    hectare: 10000,
    cent: 40.468564224,
    bigha: 1337.805170082
  };

  const unitDescriptions = {
    sqm: 'The square meter (sq m) is the SI unit of area equal to a square measuring one meter on each side. Widely used globally for measuring property, land, and floor areas.',
    sqft: 'The square foot (sq ft) is an imperial unit of area commonly used in real estate in countries like the US, UK, and India. 1 sq ft = 0.092903 sq m.',
    acre: 'An acre is a unit of land area equal to 4,840 square yards or 43,560 square feet. Commonly used in the imperial system for measuring large plots of land.',
    hectare: 'A hectare (ha) is a metric unit of area equal to 10,000 square meters or 2.471 acres. Often used for measuring larger land areas like farms and forests.',
    bigha: 'A traditional unit of land measurement in India, Nepal, and Bangladesh. The size varies by region (typically between 1,500-6,771 sq m in different states).',
    cent: 'A unit of land measurement used in southern India. 1 cent = 1/100th of an acre or approximately 40.468 square meters.',
    sqyd: 'The square yard (sq yd) is an imperial unit of area, equal to 9 square feet or about 0.836 square meters. Commonly used in textiles and some real estate.'
  };

  useEffect(() => {
    convertArea();
    generatePopularConversions();
  }, [fromValue, fromUnit, toUnit]);

  const convertArea = () => {
    if (fromUnit === toUnit) {
      setConvertedValue(fromValue || 0);
      return;
    }

    const fromFactor = SQM_PER_UNIT[fromUnit];
    const toFactor = SQM_PER_UNIT[toUnit];

    if (!fromFactor || !toFactor) {
      setConvertedValue(0);
      return;
    }

    const valueInSqm = (fromValue || 0) * fromFactor;
    const result = valueInSqm / toFactor;
    setConvertedValue(result);
  };

  const generatePopularConversions = () => {
    const currentFrom = fromUnit;
    const popular = units
      .filter(unit => unit.value !== currentFrom)
      .map(unit => {
        const toFactor = SQM_PER_UNIT[unit.value];
        const fromFactor = SQM_PER_UNIT[currentFrom];
        const value = (fromValue * fromFactor) / toFactor;
        return {
          fromUnit: currentFrom,
          toUnit: unit.value,
          value: value.toFixed(4),
          label: `${currentFrom.toUpperCase()} to ${unit.value.toUpperCase()}`
        };
      })
      .slice(0, 6); // Show top 6 popular conversions

    setPopularConversions(popular);
  };

  const prepareChartData = () => {
    const labels = popularConversions.map(c => c.toUnit.toUpperCase());
    const data = popularConversions.map(c => parseFloat(c.value));

    return {
      labels,
      datasets: [
        {
          label: `Conversion from ${fromUnit.toUpperCase()}`,
          data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 205, 86, 0.7)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 205, 86, 1)'
          ],
          borderWidth: 1
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Popular Conversions from ${fromUnit.toUpperCase()}`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Converted Value'
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `Conversion Ratios from ${fromUnit.toUpperCase()}`,
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Area Unit Converter
            </span>
          </h1>
          <p className="text-lg text-gray-600">
            Convert between all major land measurement units with precision
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Converter Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Convert {fromUnit.toUpperCase()} to {toUnit.toUpperCase()}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Unit</label>
                    <div className="relative">
                      <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:shadow-md"
                      >
                        {units.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.icon} {unit.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                    <input
                      type="number"
                      value={fromValue}
                      onChange={(e) => setFromValue(parseFloat(e.target.value) || 0)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:shadow-md"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To Unit</label>
                    <div className="relative">
                      <select
                        value={toUnit}
                        onChange={(e) => setToUnit(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:shadow-md"
                      >
                        {units.map((unit) => (
                          <option key={unit.value} value={unit.value}>
                            {unit.icon} {unit.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Converted Value</label>
                    <div className="w-full p-3 border border-gray-300 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 font-medium text-gray-800 transition-all group-hover:shadow-md">
                      {Number(convertedValue).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 6
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Info Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  About {units.find(u => u.value === fromUnit)?.label}
                </h2>
              </div>

              <p className="text-gray-600 mb-4">
                {unitDescriptions[fromUnit]}
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700 mb-2">Quick Facts</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>1 {fromUnit} = {SQM_PER_UNIT[fromUnit]} square meters</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Commonly used in {fromUnit === 'sqft' ? 'US, UK, India' : fromUnit === 'bigha' ? 'India, Nepal, Bangladesh' : 'global measurements'}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>Typical usage: {fromUnit === 'acre' ? 'land measurement' : fromUnit === 'hectare' ? 'agricultural land' : 'property measurement'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Conversion Visualization</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setChartType('bar')} 
                  className={`px-3 py-1 text-sm rounded-md ${chartType === 'bar' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Bar Chart
                </button>
                <button 
                  onClick={() => setChartType('pie')} 
                  className={`px-3 py-1 text-sm rounded-md ${chartType === 'pie' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Pie Chart
                </button>
              </div>
            </div>
            <div className="h-80">
              {chartType === 'bar' ? (
                <Bar data={prepareChartData()} options={chartOptions} />
              ) : (
                <Pie data={prepareChartData()} options={pieChartOptions} />
              )}
            </div>
          </div>

          {/* Popular Conversions */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Popular Conversions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularConversions.map((conversion, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all hover:shadow-md"
                  onClick={() => setToUnit(conversion.toUnit)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-800">{conversion.label}</h3>
                      <p className="text-sm text-gray-500">1 {conversion.fromUnit} = {conversion.value} {conversion.toUnit}</p>
                    </div>
                    <span className="text-blue-600 text-lg font-medium">
                      {conversion.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real Estate Calculators */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 p-6">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Real Estate Calculators
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {units.map((unit, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-3 rounded-lg text-center hover:bg-blue-50 transition-all cursor-pointer border border-gray-200 hover:border-blue-300"
                onClick={() => {
                  setFromUnit('sqm');
                  setToUnit(unit.value);
                }}
              >
                <div className="text-2xl mb-1">{unit.icon}</div>
                <h3 className="text-sm font-medium text-gray-800">SQM to {unit.value.toUpperCase()}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Note: Conversion factors are approximate. For precise measurements, consult local standards.
        </div>
      </div>
    </div>
  );
};

export default AreaCalculator;