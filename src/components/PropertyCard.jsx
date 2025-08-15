import { Link } from 'react-router-dom'
import { toggleFavourite, isFavourite } from '../utils/storage'
import { useEffect, useState } from 'react'

export default function PropertyCard({ home }) {
  const [fav, setFav] = useState(isFavourite(home.id))

  useEffect(() => {
    const onChange = () => setFav(isFavourite(home.id))
    window.addEventListener('favouritesUpdated', onChange)
    return () => window.removeEventListener('favouritesUpdated', onChange)
  }, [home.id])

  const onFav = (e) => {
    e.stopPropagation()
    toggleFavourite(home.id)
    setFav(isFavourite(home.id))
  }

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`
    return `₹${price.toLocaleString('en-IN')}`
  }

  return (
    <div className="relative group transition-all duration-500 hover:-translate-y-2">
      {/* Thick gradient border (visible on hover) */}
      <div className="absolute inset-0 rounded-xl p-[3px] bg-gradient-to-br from-gray-900 via-gray-700 to-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
      
      {/* Inner card with luxury styling */}
      <div className="relative h-full bg-white rounded-xl overflow-hidden flex flex-col border border-gray-200/50 group-hover:border-transparent transition-all duration-300">
        {/* Image with premium overlay */}
        <div className="relative overflow-hidden h-60">
          <img
            src={home.image}
            alt={home.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Luxury overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Premium favorite button */}
          <button
            onClick={onFav}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          >
            {fav ? (
              <span className="text-2xl text-red-500 drop-shadow-lg">❤️</span>
            ) : (
              <span className="text-2xl text-gray-400 hover:text-red-500 drop-shadow-lg">🤍</span>
            )}
          </button>
          
          {/* Luxury price tag */}
          <div className="absolute bottom-4 left-4 bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg px-4 py-2 shadow-xl backdrop-blur-sm">
            <span className="font-bold text-white text-sm tracking-wide">
              {home.priceRange
                ? `${formatPrice(home.priceRange.min)} - ${formatPrice(home.priceRange.max)}`
                : formatPrice(home.price)}
            </span>
          </div>
          
          {/* Premium badge */}
          <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            PREMIUM
          </div>
        </div>

        {/* Luxury content area */}
        <div className="p-5 flex flex-col flex-1 bg-gradient-to-b from-white to-gray-50/50">
          {/* Title with subtle gradient text */}
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 group-hover:from-primary-600 group-hover:to-primary-500 transition-all duration-500 mb-2 line-clamp-1">
            {home.title}
          </h3>

          {/* Property specs */}
          <div className="flex items-center space-x-3 mb-4">
            <span className="text-sm bg-gray-900 text-white px-3 py-1 rounded-full font-medium shadow-inner">
              {home.beds} BHK
            </span>
            <span className="text-sm text-gray-600 font-medium">{home.type}</span>
          </div>

          {/* Luxury location */}
          <div className="flex items-start mb-5">
            <svg className="w-5 h-5 text-gray-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm text-gray-600 line-clamp-2">
              {home.address}, {home.city}
            </p>
          </div>

          {/* Luxury features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {home.features?.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-white border border-gray-200/70 text-gray-700 px-3 py-1.5 rounded-full shadow-sm">
                {feature}
              </span>
            ))}
          </div>

          {/* Ultra-premium contact button */}
          <Link
            to={`/booking/${home.id}`}
            className="mt-auto w-full text-center font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 rounded-lg px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center"
          >
            <span>Contact Seller</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}