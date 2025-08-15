import { useParams } from 'react-router-dom'
import data from '../data/properties.json'
import { addBooking } from '../utils/storage'
import { useState } from 'react'
import DeveloperLogo from '../assets/Developerlogo.jpg'; 
import thumb1 from '../assets/property-thumb1.jpg';
import thumb2 from '../assets/property-thumb2.jpg';
import thumb3 from '../assets/property-thumb3.jpg';

export default function BookingDetails() {
  const { id } = useParams()
  const home = data.find(d => String(d.id) === String(id))
  const [showPhone, setShowPhone] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [agreeContact, setAgreeContact] = useState(false)
  const [interestedInLoan, setInterestedInLoan] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  if (!home) {
    return <div className="mx-auto max-w-3xl px-4 py-8">Listing not found.</div>
  }

  const handleBook = () => {
    const today = new Date()
    const inDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).toISOString().slice(0, 10)
    const outDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10).toISOString().slice(0, 10)
    addBooking({
      id: String(Date.now()),
      homeId: home.id,
      checkIn: inDate,
      checkOut: outDate,
      status: 'pending'
    })
    alert('Booking created as pending in history!')
  }

  const handleContactSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you ${name}! The developer will contact you shortly.`)
    setShowContactForm(false)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-10">
      {/* Property Header */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          {/* Main Property Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <img 
              src={home.image} 
              alt={home.title} 
              className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105" 
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">{home.title}</h1>
              <div className="text-gray-200">{home.address}, {home.city}</div>
            </div>
            {home.popular && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Popular Choice
              </div>
            )}
          </div>

          {/* Image Thumbnails */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            {(home.images && home.images.length >= 3
              ? home.images.slice(0, 3)
              : [thumb1, thumb2, thumb3]
            ).map((img, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-lg group">
                <img 
                  src={img} 
                  alt={`Additional view ${idx + 1}`} 
                  className="w-full h-28 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Price Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-gray-200">
            <div className="text-3xl font-bold text-gray-900">
              {home.for === 'rent' ? `₹${home.price.toLocaleString('en-IN')}/mo` : `₹${home.price.toLocaleString('en-IN')}`}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-gray-600">
                <span className="font-medium">₹{Math.round(home.price/home.carpetArea).toLocaleString('en-IN')}/sq.ft</span>
                <span className="mx-2">|</span>
                <span>EMI starts at ₹{(home.price * 0.0005).toLocaleString('en-IN')}</span>
              </span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                All Inclusive
              </span>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-gray-500">Configuration</p>
              <p className="font-medium">{home.bhkType || '3 BHK Apartment'}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-gray-500">Carpet Area</p>
              <p className="font-medium">{home.carpetArea || '1400 sq.ft.'}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-gray-500">Possession</p>
              <p className="font-medium">{home.status || 'Under Construction'}</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
              <p className="text-gray-500">Project Name</p>
              <p className="font-medium">{home.projectName || 'JBMR Tathastu'}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={handleBook} 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              Book Now
            </button>
            <button 
              onClick={() => document.getElementById('amenities').scrollIntoView({ behavior: 'smooth' })} 
              className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 font-medium transition-colors"
            >
              See Amenities
            </button>
            <button 
              onClick={() => setShowPhone(!showPhone)} 
              className="px-6 py-3 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 font-medium transition-colors"
            >
              {showPhone ? home.sellerPhone || '+91-9876543210' : 'View Phone'}
            </button>
            <button 
              onClick={() => setShowContactForm(true)} 
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-600 to-teal-600 text-white font-medium hover:from-green-700 hover:to-teal-700 transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
            >
              Contact Developer
            </button>
          </div>
        </div>
      </div>

      {/* Property Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'amenities' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Amenities
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'location' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Location
            </button>
            <button
              onClick={() => setActiveTab('developer')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'developer' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            >
              Developer
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Project Highlights</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors">
                      <p className="text-gray-600 text-sm">Project Area</p>
                      <p className="font-medium">{home.projectArea || '0.5 Acres'}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors">
                      <p className="text-gray-600 text-sm">Launch Date</p>
                      <p className="font-medium">{home.launchDate || 'May, 2025'}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors">
                      <p className="text-gray-600 text-sm">Configuration</p>
                      <p className="font-medium">{home.bhkType || '3 BHK Apartment'}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-xl hover:bg-blue-100 transition-colors">
                      <p className="text-gray-600 text-sm">Size</p>
                      <p className="font-medium">{home.carpetArea || '1400 sq.ft.'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Financial Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition-colors">
                      <p className="text-gray-600 text-sm">Avg. Price</p>
                      <p className="font-medium">₹{Math.round(home.price/home.carpetArea).toLocaleString('en-IN')}/sq.ft</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition-colors">
                      <p className="text-gray-600 text-sm">Project Size</p>
                      <p className="font-medium">{home.units ? `${home.units} units` : '2 Buildings - 40 units'}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition-colors">
                      <p className="text-gray-600 text-sm">Possession</p>
                      <p className="font-medium">{home.status || 'Under Construction'}</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl hover:bg-purple-100 transition-colors">
                      <p className="text-gray-600 text-sm">Rera Id</p>
                      <p className="font-medium">{home.reraId || 'Rera Not Applicable'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">About the Project</h3>
                <p className="text-gray-700 leading-relaxed">
                  {home.longDescription || `JBMR Tathastu is a premium residential project offering luxurious 3 BHK apartments with modern amenities. Located in a prime location with excellent connectivity, the project features contemporary architecture, spacious rooms, and high-quality finishes. The development includes a clubhouse, swimming pool, landscaped gardens, and 24/7 security for a comfortable living experience.`}
                </p>
                <div className="mt-6 grid sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-600 text-sm">Developer</p>
                    <p className="font-medium">{home.developer || 'JBMR Group'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-600 text-sm">Owner</p>
                    <p className="font-medium">{home.owner || 'Private Owner'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <p className="text-gray-600 text-sm">Listed on</p>
                    <p className="font-medium">{home.listedOn || '2025-02-23'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Amenities Tab */}
          {activeTab === 'amenities' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Project Amenities</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: "Garden", icon: "🌿" },
                  { name: "Parking", icon: "🚗" },
                  { name: "Lift", icon: "🛗" },
                  { name: "Balcony", icon: "🏙️" },
                  { name: "Clubhouse", icon: "🏛️" },
                  { name: "Swimming Pool", icon: "🏊" },
                  { name: "Gymnasium", icon: "💪" },
                  { name: "24x7 Security", icon: "👮" }
                ].map((amenity, index) => (
                  <div 
                    key={index} 
                    className="bg-white border border-gray-200 p-4 rounded-xl hover:shadow-md transition-all hover:border-blue-200"
                  >
                    <div className="text-2xl mb-2">{amenity.icon}</div>
                    <p className="font-medium">{amenity.name}</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 text-blue-600 font-medium flex items-center">
                +10 more amenities
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* Location Tab */}
          {activeTab === 'location' && (
            <div>
              <h3 className="text-xl font-semibold mb-6">Nearby Locations</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h4 className="font-medium mb-4">Essential Services</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                      </div>
                      <span>Shopping Mall – 2 km</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span>Schools – 500 m</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                        </svg>
                      </div>
                      <span>Metro Station – 1 km</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                        </svg>
                      </div>
                      <span>Restaurants & Resorts – 2.5 km</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <span>Bus Stop – 300 m</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                  <h4 className="font-medium mb-4">Other Conveniences</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <span>DMart – 1 km</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.494l-.318.158a6 6 0 01-3.86.494L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <span>Hospitals – 1.5 km</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </div>
                      <span>Parks – 200 m</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span>Bank/ATM – 800 m</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span>Movie Theater – 3 km</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Developer Tab */}
          {activeTab === 'developer' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img 
                    src={home.developerLogo || DeveloperLogo} 
                    alt="Developer Logo" 
                    className="w-full max-w-xs rounded-2xl border-4 border-white shadow-lg" 
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">{home.developer || 'JBMR Group'}</h3>
                  <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                      <p className="text-gray-600 text-sm">Year established</p>
                      <p className="font-medium text-xl">2019</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                      <p className="text-gray-600 text-sm">Projects completed</p>
                      <p className="font-medium text-xl">7</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-6">
                    Welcome to {home.developer || 'JBMR GROUP'} Real Estate, where we are dedicated to providing our clients with exceptional real estate services. We are a team of experienced professionals committed to quality and customer satisfaction.
                  </p>
                  <button className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all">
                    Read More
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6">Other Projects by {home.developer || 'JBMR Group'}</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-xl overflow-hidden hover:shadow-md transition-all">
                    <div className="h-40 bg-gray-200 relative">
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h5 className="text-white font-medium">JBMR The Mist</h5>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">3 BHK Flat • Chhattarpur, New Delhi</p>
                      <p className="font-medium mt-2">₹70.0 L</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">Possession: Ready to Move</span>
                        <button className="text-blue-600 text-sm font-medium">Contact</button>
                      </div>
                    </div>
                  </div>
                  <div className="border rounded-xl overflow-hidden hover:shadow-md transition-all">
                    <div className="h-40 bg-gray-200 relative">
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <h5 className="text-white font-medium">The Horizon 2</h5>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm">2, 3 BHK Builder Floors • Chhattarpur Extension</p>
                      <p className="font-medium mt-2">₹51.73 L - 69.99 L</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">Possession: 3 years</span>
                        <button className="text-blue-600 text-sm font-medium">Contact</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Developer Form - Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contact Seller</h2>
              <button 
                onClick={() => setShowContactForm(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6 p-4 bg-blue-50 rounded-xl">
              <img 
                src={home.developerLogo || DeveloperLogo} 
                alt="Developer Logo" 
                className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" 
              />
              <div>
                <p className="font-semibold">{home.developer || 'JBMR Group'}</p>
                <p className="text-sm text-gray-600">{home.developerPhone || '+9714800XXXXXX'}</p>
              </div>
            </div>
            
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Name</label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Phone</label>
                <input 
                  type="tel" 
                  placeholder="+91 Phone number" 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">Email (optional)</label>
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-3">
                <label className="flex items-start gap-3 text-sm">
                  <input 
                    type="checkbox" 
                    className="mt-1"
                    checked={agreeContact}
                    onChange={(e) => setAgreeContact(e.target.checked)}
                  />
                  <span>I agree to be contacted by Housing and agents via WhatsApp, SMS, phone, email etc</span>
                </label>
                <label className="flex items-start gap-3 text-sm">
                  <input 
                    type="checkbox" 
                    className="mt-1"
                    checked={interestedInLoan}
                    onChange={(e) => setInterestedInLoan(e.target.checked)}
                  />
                  <span>I am interested in Home Loans</span>
                </label>
              </div>
              
              <button 
                type="submit" 
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all mt-4"
              >
                Get Contact Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}