import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(3300000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [savings, setSavings] = useState(0);
  const [amortizationTable, setAmortizationTable] = useState([]);
  const [showFullTable, setShowFullTable] = useState(false);
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, tenure, interestRate]);

  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    const emiValue = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                    (Math.pow(1 + monthlyRate, months) - 1);
    
    setEmi(emiValue);
    
    let balance = loanAmount;
    const table = [];
    let totalInterestPaid = 0;
    
    for (let year = 1; year <= tenure; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = emiValue - interest;
        
        yearlyPrincipal += principal;
        yearlyInterest += interest;
        balance -= principal;
      }
      
      totalInterestPaid += yearlyInterest;
      
      table.push({
        year: new Date().getFullYear() + year - 1,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: balance > 0 ? balance : 0,
        paid: ((loanAmount - balance) / loanAmount) * 100
      });
    }
    
    const total = loanAmount + totalInterestPaid;
    setTotalInterest(totalInterestPaid);
    setTotalPayment(total);
    setSavings(calculateSavings(emiValue, totalInterestPaid));
    setAmortizationTable(table);
  };

  const calculateSavings = (emi, totalInterest) => {
    return (totalInterest * 0.15).toFixed(0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const toggleAmortizationTable = () => {
    setShowFullTable(!showFullTable);
  };

  const chartData = {
    labels: amortizationTable.map(row => row.year),
    datasets: [
      {
        label: 'Principal Paid',
        data: amortizationTable.map(row => row.principal),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        tension: 0.1
      },
      {
        label: 'Interest Paid',
        data: amortizationTable.map(row => row.interest),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Yearly Payment Breakdown',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(0) + 'L';
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            EMI Calculator
          </h1>
          <p className="text-gray-600">
            Smart financial planning for your dream home
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Calculator Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Loan Parameters
                </h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                  LIVE CALCULATION
                </span>
              </div>
              
              <div className="space-y-5">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700">Loan Amount</label>
                    <span className="text-sm font-medium text-blue-600">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="50000000"
                    step="100000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>₹1L</span>
                    <span>₹50L</span>
                  </div>
                </div>
                
                {/* Tenure */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700">Tenure (Years)</label>
                    <span className="text-sm font-medium text-green-600">
                      {tenure} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>1</span>
                    <span>30</span>
                  </div>
                </div>
                
                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700">Interest Rate (% p.a.)</label>
                    <span className="text-sm font-medium text-purple-600">
                      {interestRate}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>6%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Results Section */}
            {emi > 0 && (
              <div className="bg-gray-50 p-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* EMI Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-blue-100 p-1.5 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800">Monthly EMI</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(emi)}</p>
                    <p className="text-sm text-gray-500">Per month for {tenure} years</p>
                  </div>
                  
                  {/* Total Interest Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-red-100 p-1.5 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800">Total Interest</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalInterest)}</p>
                    <p className="text-sm text-gray-500">{((totalInterest / loanAmount) * 100).toFixed(1)}% of loan amount</p>
                  </div>
                  
                  {/* Total Payment Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-green-100 p-1.5 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800">Total Payment</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPayment)}</p>
                    <p className="text-sm text-gray-500">Principal + Interest</p>
                  </div>
                  
                  {/* Potential Savings Card */}
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center mb-2">
                      <div className="bg-amber-100 p-1.5 rounded-md mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="font-medium text-gray-800">Potential Savings</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(savings)}</p>
                    <p className="text-sm text-gray-500">With better interest rates</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Stats Section */}
          {emi > 0 && (
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Financial Breakdown
                </h2>
                
                {/* Loan Composition */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Loan Composition</h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-40 h-40">
                      <div className="absolute inset-0 rounded-full border-8 border-blue-500"></div>
                      <div className="absolute inset-0 rounded-full border-8 border-blue-300" style={{ clipPath: `inset(0 0 0 50%)` }}></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-xs font-medium text-gray-600">
                            {((loanAmount / totalPayment) * 100).toFixed(0)}%
                          </div>
                          <div className="text-xs text-gray-500">Principal</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Yearly Summary */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Yearly Summary</h3>
                  <div className="space-y-3">
                    {amortizationTable.slice(0, 3).map((row, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-gray-800">{row.year}</span>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                            {row.paid.toFixed(1)}% Paid
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-xs">
                          <div>
                            <span className="text-gray-500">Principal:</span> {formatCurrency(row.principal)}
                          </div>
                          <div>
                            <span className="text-gray-500">Interest:</span> {formatCurrency(row.interest)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* View Full Table Button */}
                <button 
                  onClick={toggleAmortizationTable}
                  className="w-full text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center justify-center py-2"
                >
                  {showFullTable ? 'Hide Amortization Table' : 'View Full Amortization Table'}
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${showFullTable ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Full-width Amortization Table and Chart */}
        {emi > 0 && showFullTable && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Amortization Schedule</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setChartType('line')} 
                  className={`px-3 py-1 text-sm rounded-md ${chartType === 'line' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Line Chart
                </button>
                <button 
                  onClick={() => setChartType('bar')} 
                  className={`px-3 py-1 text-sm rounded-md ${chartType === 'bar' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  Bar Chart
                </button>
              </div>
            </div>

            {/* Chart Visualization */}
            <div className="mb-8 h-80">
              {chartType === 'line' ? (
                <Line data={chartData} options={options} />
              ) : (
                <Bar data={chartData} options={options} />
              )}
            </div>

            {/* Full Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance (₹)</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid (%)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {amortizationTable.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{row.year}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.principal)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{formatCurrency(row.balance)}</td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="w-8">{row.paid.toFixed(1)}</span>
                          <div className="ml-2 w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${row.paid}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          Calculations are estimates. Actual terms may vary.
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;