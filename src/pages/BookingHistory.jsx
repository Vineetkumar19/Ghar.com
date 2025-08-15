import { getBookings } from '../utils/storage'
import data from '../data/properties.json'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FiCalendar, FiHome, FiMapPin, FiDollarSign, FiClock, FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi'

export default function BookingHistory() {
  const [bookings, setBookings] = useState(getBookings())
  useEffect(() => {
    const h = () => setBookings(getBookings())
    window.addEventListener('bookingsUpdated', h)
    return () => window.removeEventListener('bookingsUpdated', h)
  }, [])
  const enriched = bookings.map(b => ({ ...b, home: data.find(d => d.id === b.homeId) }))

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <FiCheckCircle className="inline mr-1" />
      case 'pending': return <FiClock className="inline mr-1" />
      default: return <FiAlertCircle className="inline mr-1" />
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        Your Booking History
      </h1>
      
      {enriched.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl text-center max-w-md">
            <FiHome className="mx-auto text-4xl text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h2>
            <p className="text-gray-500 mb-4">Your future stays will appear here</p>
            <Link 
              to="/" 
              className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Explore Properties
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6">
          {enriched.map(b => (
            <div 
              key={b.id} 
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative flex flex-col md:flex-row">
                <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                  <img 
                    src={b.home.image} 
                    alt={b.home.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {b.home.title}
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center ${
                      b.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      b.status === 'pending' ? 'bg-amber-100 text-amber-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {getStatusIcon(b.status)}{b.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <FiMapPin className="mr-2" />
                    <span>{b.home.location}</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-blue-500" />
                      <div>
                        <p className="text-sm text-gray-500">Check-in</p>
                        <p className="font-medium">{b.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-purple-500" />
                      <div>
                        <p className="text-sm text-gray-500">Check-out</p>
                        <p className="font-medium">{b.checkOut}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiDollarSign className="mr-2 text-green-500" />
                      <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="font-medium">${b.home.price * 3} <span className="text-sm text-gray-500">(3 nights)</span></p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FiHome className="mr-2 text-amber-500" />
                      <div>
                        <p className="text-sm text-gray-500">Type</p>
                        <p className="font-medium">{b.home.type}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex space-x-2">
                      {b.home.amenities.slice(0, 3).map((amenity, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {amenity}
                        </span>
                      ))}
                      {b.home.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{b.home.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      to={`/booking/${b.homeId}`} 
                      className="px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-300 flex items-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
