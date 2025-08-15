import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const AffordabilityCalculator = () => {
  const [downPayment, setDownPayment] = useState(100000);
  const [salary, setSalary] = useState(75000);
  const [tenure, setTenure] = useState(20);
  const [interestRate, setInterestRate] = useState(6.8);
  const [otherEMI, setOtherEMI] = useState(0);
  const [eligibility, setEligibility] = useState(0);
  const [propertyCost, setPropertyCost] = useState(0);
  const [emiBreakdown, setEmiBreakdown] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');

  const calculateAffordability = () => {
    // 60% of net income can be used for EMI
    const maxEMI = (salary * 0.6) - otherEMI;
    
    // EMI formula to calculate loan amount
    const monthlyRate = interestRate / 12 / 100;
    const months = tenure * 12;
    
    const loanAmount = (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) / 
                      (monthlyRate * Math.pow(1 + monthlyRate, months));
    
    const totalAffordable = loanAmount + downPayment;
    
    // Calculate EMI breakdown for chart
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
    setPropertyCost(totalAffordable > 0 ? totalAffordable : 0);
    setEmiBreakdown(breakdown);
    setActiveTab('results');
  };

  // Chart data for EMI breakdown
  const emiChartData = {
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

  // Pie chart data for payment composition
  const pieChartData = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        data: [
          emiBreakdown.reduce((sum, item) => sum + item.principal, 0),
          emiBreakdown.reduce((sum, item) => sum + item.interest, 0)
        ],
        backgroundColor: ['#4f46e5', '#a78bfa'],
        borderWidth: 0
      }
    ]
  };

  // Calculate total interest paid
  const totalInterest = emiBreakdown.reduce((sum, item) => sum + item.interest, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Home Affordability Calculator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          We'll help you estimate how much you can afford based on your financial situation
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
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-8">
              {/* Down Payment Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                    Down Payment (₹)
                  </label>
                  <span className="text-indigo-600 font-bold">₹{downPayment.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000000"
                  step="10000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-600 [&::-webkit-slider-thumb]:to-purple-600 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>₹0</span>
                  <span>₹1Cr</span>
                </div>
              </div>
              
              {/* Salary Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                    Monthly Salary (₹)
                  </label>
                  <span className="text-indigo-600 font-bold">₹{salary.toLocaleString()}</span>
                </div>
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
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                    Tenure (Years)
                  </label>
                  <span className="text-indigo-600 font-bold">{tenure}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="35"
                  value={tenure}
                  onChange={(e) => setTenure(parseInt(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-indigo-600 [&::-webkit-slider-thumb]:to-purple-600 hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-500">
                  <span>2</span>
                  <span>35</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div className="space-y-8">
              {/* Interest Rate Input */}
              <div className="group">
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                    Interest Rate (% p.a.)
                  </label>
                  <span className="text-indigo-600 font-bold">{interestRate}%</span>
                </div>
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
                <div className="flex justify-between items-center mb-3">
                  <label className="block text-gray-700 font-medium group-hover:text-indigo-600 transition-colors">
                    Other Monthly EMI (₹)
                  </label>
                  <span className="text-indigo-600 font-bold">₹{otherEMI.toLocaleString()}</span>
                </div>
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
              
              {/* Quick Tips */}
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                <h3 className="font-medium text-indigo-800 mb-2">Quick Tips</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li className="flex items-start">
                    <svg className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Higher down payment reduces loan amount
                  </li>
                  <li className="flex items-start">
                    <svg className="h-4 w-4 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Longer tenure reduces EMI but increases interest
                  </li>
                </ul>
              </div>
              
              <button
                onClick={calculateAffordability}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Calculate Affordability
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Home Affordability</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
                <p className="text-gray-600 font-medium mb-2">Maximum Loan Amount</p>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{Math.round(eligibility).toLocaleString()}
                </p>
                <div className="mt-4 h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                    style={{ width: `${Math.min(100, (eligibility / 50000000) * 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
                <p className="text-gray-600 font-medium mb-2">Affordable Property Value</p>
                <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ₹{Math.round(propertyCost).toLocaleString()}
                </p>
                <div className="mt-4 h-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                    style={{ width: `${Math.min(100, (propertyCost / 100000000) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">Affordability Breakdown</h4>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Down Payment</span>
                  <span className="font-medium">₹{downPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Amount</span>
                  <span className="font-medium">₹{Math.round(eligibility).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium">{interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-3">
                  <span className="text-gray-800 font-semibold">Total Property Value</span>
                  <span className="text-indigo-600 font-bold">
                    ₹{Math.round(propertyCost).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  Apply Now
                </button>
                <button className="bg-white border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  View Properties
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Overview</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-4">Monthly Payment</h4>
              <p className="text-3xl font-bold text-indigo-600 mb-2">
                ₹{Math.round((salary * 0.6) - otherEMI).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">60% of your income after other EMIs</p>
              
              <div className="mt-6">
                <h5 className="font-medium text-gray-700 mb-3">First Year Payment Composition</h5>
                <div className="h-64">
                  <Line 
                    data={emiChartData} 
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
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">Total Payment Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-48">
                  <Pie 
                    data={pieChartData} 
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                      }
                    }}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Principal</span>
                    <span className="font-medium">₹{Math.round(eligibility).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Interest</span>
                    <span className="font-medium">₹{Math.round(totalInterest).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-800 font-semibold">Total Payment</span>
                    <span className="text-indigo-600 font-bold">
                      ₹{Math.round(eligibility + totalInterest).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {activeTab === 'analysis' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Affordability Analysis</h2>
            
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
                      strokeDasharray={`${(eligibility / propertyCost) * 100}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">
                      {Math.round((eligibility / propertyCost) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-gray-700 mb-2">
                    Your loan covers <span className="font-semibold">{Math.round((eligibility / propertyCost) * 100)}%</span> of the property value.
                  </p>
                  <p className="text-sm text-gray-500">
                    Most lenders prefer LTV ratios below 80-90% for better rates.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Optimization Suggestions</h2>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200 mb-6">
              <h4 className="font-bold text-gray-800 mb-4">How to Improve Affordability</h4>
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
                      Adding ₹1L more increases your budget by <span className="font-medium">₹{Math.round(100000 * (1 + (Math.pow(1 + (interestRate/12/100), tenure*12) - 1) / ((interestRate/12/100) * Math.pow(1 + (interestRate/12/100), tenure*12)))).toLocaleString()}</span>
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
                      Extending to {tenure+5} years could increase budget by <span className="font-medium">₹{Math.round(eligibility * 0.15).toLocaleString()}</span> but increases total interest
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
                    <h5 className="font-medium text-gray-800">Reduce Other EMIs</h5>
                    <p className="text-sm text-gray-600">
                      Eliminating other EMIs could increase budget by <span className="font-medium">₹{Math.round(otherEMI * (Math.pow(1 + (interestRate/12/100), tenure*12) - 1) / ((interestRate/12/100) * Math.pow(1 + (interestRate/12/100), tenure*12))).toLocaleString()}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-inner border border-gray-200">
              <h4 className="font-bold text-gray-800 mb-4">Interest Rate Impact</h4>
              <div className="h-64">
                <Line 
                  data={{
                    labels: ['6%', '8%', '10%', '12%', '14%', '16%', '18%', '20%'],
                    datasets: [
                      {
                        label: 'Affordable Property Value',
                        data: [6, 8, 10, 12, 14, 16, 18, 20].map(rate => {
                          const monthlyRate = rate / 12 / 100;
                          const months = tenure * 12;
                          const maxEMI = (salary * 0.6) - otherEMI;
                          const loanAmount = (maxEMI * (Math.pow(1 + monthlyRate, months) - 1)) / 
                                            (monthlyRate * Math.pow(1 + monthlyRate, months));
                          return Math.round(loanAmount + downPayment);
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
                          text: 'Property Value (₹)'
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
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Affordability is Calculated</h2>
            <p className="text-gray-700 leading-relaxed">
              Our calculator considers your monthly income, existing liabilities, down payment capacity, 
              and current interest rates to determine how much home you can afford. We follow standard 
              banking guidelines that typically allow up to 60% of your income for EMI payments after 
              accounting for other financial obligations.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips to Improve Affordability</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Increase your down payment amount to reduce loan burden
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Opt for longer tenure to reduce EMI (but increases total interest)
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Improve credit score for better interest rates
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3">
                  <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Consider joint applications with family members
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AffordabilityCalculator;