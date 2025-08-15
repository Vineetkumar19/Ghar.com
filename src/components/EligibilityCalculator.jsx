import React, { useState, useEffect } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

const EligibilityCalculator = () => {
  const [salary, setSalary] = useState(100000);
  const [tenure, setTenure] = useState(16);
  const [interestRate, setInterestRate] = useState(6.8);
  const [otherEMI, setOtherEMI] = useState(0);
  const [eligibility, setEligibility] = useState(0);
  const [monthlyEMI, setMonthlyEMI] = useState(0);
  const [emiBreakdown, setEmiBreakdown] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');

  const calculateEligibility = () => {
    // 60% of net income can be used for EMI
    const maxEMI = (salary * 0.6) - otherEMI;
    
    // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    const loanAmount = (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) / 
                      (monthlyRate * Math.pow(1 + monthlyRate, months));
    
    // Calculate EMI breakdown for visualization
    const breakdown = [];
    let principal = loanAmount;
    for (let i = 1; i <= months; i++) {
      const interest = principal * monthlyRate;
      const principalPaid = maxEMI - interest;
      principal -= principalPaid;
      breakdown.push({
        month: i,
        principal: principalPaid,
        interest: interest
      });
    }
    
    setEligibility(loanAmount > 0 ? loanAmount : 0);
    setMonthlyEMI(maxEMI > 0 ? maxEMI : 0);
    setEmiBreakdown(breakdown);
    setActiveTab('results');
  };

  // Data for pie chart (principal vs interest)
  const pieData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [
          emiBreakdown.reduce((sum, item) => sum + item.principal, 0),
          emiBreakdown.reduce((sum, item) => sum + item.interest, 0)
        ],
        backgroundColor: ['#4f46e5', '#a78bfa'],
        borderWidth: 0,
      },
    ],
  };

  // Data for line chart (EMI breakdown over time)
  const lineData = {
    labels: emiBreakdown.slice(0, 12).map((_, i) => `Month ${i + 1}`),
    datasets: [
      {
        label: 'Principal',
        data: emiBreakdown.slice(0, 12).map(item => item.principal),
        borderColor: '#4f46e5',
        backgroundColor: '#4f46e5',
        tension: 0.1
      },
      {
        label: 'Interest',
        data: emiBreakdown.slice(0, 12).map(item => item.interest),
        borderColor: '#a78bfa',
        backgroundColor: '#a78bfa',
        tension: 0.1
      }
    ]
  };

  // Calculate total interest paid
  const totalInterest = emiBreakdown.reduce((sum, item) => sum + item.interest, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Home Loan Eligibility Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Buying a dream home is a landmark event. Check your eligibility to know how much loan you can get.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'calculator' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Calculator
          </button>
          <button
            onClick={() => eligibility > 0 && setActiveTab('results')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'results' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-600 hover:text-gray-800'}`}
            disabled={eligibility <= 0}
          >
            Results
          </button>
          <button
            onClick={() => eligibility > 0 && setActiveTab('analysis')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'analysis' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-600 hover:text-gray-800'}`}
            disabled={eligibility <= 0}
          >
            Analysis
          </button>
        </div>
      </div>

      {/* Calculator Tab */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100 transform hover:scale-[1.01] transition-all duration-300">
            <div className="space-y-8">
              {/* Salary Input */}
              <div className="group">
                <label className="block text-gray-700 font-medium mb-3 group-hover:text-indigo-600 transition-colors">
                  Your Monthly Salary (₹)
                  <span className="ml-2 text-indigo-600 font-bold">₹{salary.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="1000"
                  value={salary}
                  onChange={(e) => setSalary(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-600 [&::-webkit-slider-thumb]:to-purple-600 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>₹10K</span>
                  <span>₹2L+</span>
                </div>
              </div>
              
              {/* Tenure Input */}
              <div className="group">
                <label className="block text-gray-700 font-medium mb-3 group-hover:text-indigo-600 transition-colors">
                  Tenure (Years)
                  <span className="ml-2 text-indigo-600 font-bold">{tenure}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-600 [&::-webkit-slider-thumb]:to-purple-600 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>2</span>
                  <span>30</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-8">
              {/* Interest Rate Input */}
              <div className="group">
                <label className="block text-gray-700 font-medium mb-3 group-hover:text-indigo-600 transition-colors">
                  Interest Rate (% p.a.)
                  <span className="ml-2 text-indigo-600 font-bold">{interestRate}%</span>
                </label>
                <input
                  type="range"
                  min="6"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-600 [&::-webkit-slider-thumb]:to-purple-600 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>6%</span>
                  <span>20%</span>
                </div>
              </div>
              
              {/* Other EMI Input */}
              <div className="group">
                <label className="block text-gray-700 font-medium mb-3 group-hover:text-indigo-600 transition-colors">
                  Other Monthly EMI (₹)
                  <span className="ml-2 text-indigo-600 font-bold">₹{otherEMI.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="1000"
                  value={otherEMI}
                  onChange={(e) => setOtherEMI(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-600 [&::-webkit-slider-thumb]:to-purple-600 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>₹0</span>
                  <span>₹2L+</span>
                </div>
              </div>
              
              <button
                onClick={calculateEligibility}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Check Eligibility
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Home Loan Eligibility</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600 font-medium">Loan Amount</p>
                  <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ₹{Math.round(eligibility).toLocaleString()}
                  </p>
                </div>
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-6">
                <p className="text-gray-600 font-medium">Monthly EMI</p>
                <p className="text-3xl font-bold text-gray-800">₹{Math.round(monthlyEMI).toLocaleString()}</p>
                <div className="mt-4 h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                    style={{ width: `${Math.min(100, (monthlyEMI / 100000) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  Apply Now
                </button>
                <button className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  Calculate EMI
                </button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">Loan Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-medium">₹{Math.round(eligibility).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium">{interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Tenure</span>
                  <span className="font-medium">{tenure} years</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-800 font-semibold">Total Payment</span>
                  <span className="text-indigo-600 font-bold">
                    ₹{(monthlyEMI * tenure * 12).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Analysis</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-4">Payment Composition</h4>
              <div className="h-64">
                <Pie 
                  data={pieData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `${context.label}: ₹${context.raw.toLocaleString()}`;
                          }
                        }
                      }
                    }
                  }}
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-sm text-indigo-600">Principal</p>
                  <p className="font-bold">₹{Math.round(emiBreakdown.reduce((sum, item) => sum + item.principal, 0)).toLocaleString()}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-600">Interest</p>
                  <p className="font-bold">₹{Math.round(totalInterest).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">EMI Breakdown (First Year)</h4>
              <div className="h-64">
                <Line 
                  data={lineData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Amount (₹)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Financial Ratios</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-4">Debt-to-Income Ratio</h4>
              <div className="flex items-center justify-between">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeDasharray={`${((salary * 0.6) / salary) * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">
                      {Math.round(((salary * 0.6) / salary) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-gray-700 mb-2">
                    Your maximum recommended housing payment is <span className="font-semibold">60%</span> of your income.
                  </p>
                  <p className="text-sm text-gray-500">
                    Lenders typically prefer this ratio to be below 40-50% for loan approval.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">Loan-to-Value Ratio</h4>
              <div className="flex items-center justify-between">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeDasharray={`${(eligibility / (eligibility + (salary * 0.1))) * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">
                      {Math.round((eligibility / (eligibility + (salary * 0.1))) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-gray-700 mb-2">
                    Your loan covers <span className="font-semibold">{Math.round((eligibility / (eligibility + (salary * 0.1))) * 100)}%</span> of the property value.
                  </p>
                  <p className="text-sm text-gray-500">
                    Most lenders prefer LTV ratios below 80-90% for better rates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Interest Rate Impact</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-4">Loan Amount at Different Rates</h4>
              <div className="h-64">
                <Line 
                  data={{
                    labels: ['6%', '8%', '10%', '12%', '14%', '16%', '18%', '20%'],
                    datasets: [
                      {
                        label: 'Loan Amount',
                        data: [6, 8, 10, 12, 14, 16, 18, 20].map(rate => {
                          const monthlyRate = rate / 12 / 100;
                          const months = tenure * 12;
                          const maxEMI = (salary * 0.6) - otherEMI;
                          return (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) / 
                                 (monthlyRate * Math.pow(1 + monthlyRate, months));
                        }),
                        borderColor: '#4f46e5',
                        backgroundColor: '#4f46e5',
                        tension: 0.1
                      }
                    ]
                  }} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        callbacks: {
                          label: function(context) {
                            return `₹${context.raw.toLocaleString()}`;
                          }
                        }
                      }
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        title: {
                          display: true,
                          text: 'Loan Amount (₹)'
                        },
                        ticks: {
                          callback: function(value) {
                            return '₹' + (value/100000).toFixed(0) + 'L';
                          }
                        }
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Interest Rate (%)'
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">Optimization Suggestions</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Increase Down Payment</h5>
                    <p className="text-sm text-gray-600">
                      Adding ₹1L more increases your budget by approximately ₹{Math.round(100000 * (1 + (Math.pow(1 + (interestRate/12/100), tenure*12) - 1) / ((interestRate/12/100) * Math.pow(1 + (interestRate/12/100), tenure*12)))).toLocaleString()}
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Extend Loan Tenure</h5>
                    <p className="text-sm text-gray-600">
                      Extending to {tenure+5} years could increase budget by approximately ₹{Math.round(eligibility * 0.15).toLocaleString()} but increases total interest
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What is Home Loan Eligibility?</h2>
            <p className="text-gray-700 leading-relaxed">
              Before applying for a home loan, understanding the eligibility criteria is crucial to avoid rejection. 
              Lenders evaluate your creditworthiness and repayment capability based on multiple parameters including 
              income, existing liabilities, credit score, and property value.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Improve Eligibility?</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Maintain a credit score above 750
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Reduce existing debts and EMIs
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Include all income sources in application
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Choose a longer repayment tenure
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EligibilityCalculator;