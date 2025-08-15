import { useState } from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { FaSearch, FaHeart, FaMapMarkerAlt, FaRupeeSign, FaChevronUp, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { MdApartment, MdSell, MdHomeWork } from 'react-icons/md';
import searchBg from '../assets/search-bg.jpg';

export default function SearchPage() {
  const [city, setCity] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [propertyType, setPropertyType] = useState('All Residential');
  const [searchFocus, setSearchFocus] = useState(false);
  const navigate = useNavigate();

  const propertyTypes = [
    { value: 'All Residential', icon: <MdHomeWork className="mr-2" /> },
    { value: 'Buy', icon: <MdSell className="mr-2" /> },
    { value: 'Rent', icon: <FaRupeeSign className="mr-2" /> },
    { value: 'New Launch', icon: <MdApartment className="mr-2" /> },
    { value: 'Commercial', icon: <FaMapMarkerAlt className="mr-2" /> },
    { value: 'Plots/Land', icon: <FaMapMarkerAlt className="mr-2" /> }
  ];

  const popularCities = [
    'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 
    'Chennai', 'Pune', 'Kolkata', 'Ahmedabad'
  ];

  const handlePriceChange = (type, value) => {
    const numValue = parseInt(value) || 0;
    if (type === 'min') {
      setMin(numValue);
    } else {
      setMax(numValue);
    }
  };

  const incrementPrice = (type) => {
    if (type === 'min') {
      setMin(prev => (parseInt(prev) || 0) + 5000);
    } else {
      setMax(prev => (parseInt(prev) || 0) + 5000);
    }
  };

  const decrementPrice = (type) => {
    if (type === 'min') {
      setMin(prev => Math.max((parseInt(prev) || 0) - 5000, 0));
    } else {
      setMax(prev => Math.max((parseInt(prev) || 0) - 5000, 0));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const params = {};
    if (city) params.city = city;
    if (min) params.min = min;
    if (max) params.max = max;
    if (propertyType !== 'All Residential') params.type = propertyType;
    navigate({ pathname: '/listings', search: `?${createSearchParams(params)}` });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section with Background Image */}
      <div 
        className="relative rounded-2xl overflow-hidden mb-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${searchBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
        <div className="relative z-10 text-center py-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">Find Your Dream Home</h1>
          <p className="text-xl text-white/90 mb-8 drop-shadow-md">Discover premium properties across India</p>
          
          {/* Property Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setPropertyType(type.value)}
                className={`flex items-center px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  propertyType === type.value 
                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg' 
                    : 'bg-white/90 text-gray-800 hover:bg-white shadow-md'
                }`}
              >
                {type.icon}
                {type.value}
              </button>
            ))}
          </div>
        </div>
      </div>

{/* Premium Search Section */}
<div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 mb-10 border border-gray-200/30 backdrop-blur-sm relative z-10">
  <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-5">
    {/* Location Search - Fixed to appear in front */}
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-xl -m-0.5 z-0 group-hover:opacity-100 opacity-0 transition-all duration-500"></div>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <FaMapMarkerAlt className="text-gray-500 group-hover:text-blue-500 transition-colors" />
      </div>
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onFocus={() => setSearchFocus(true)}
        onBlur={() => setTimeout(() => setSearchFocus(false), 200)}
        placeholder="Search for locality, landmark..."
        className="relative pl-11 pr-4 py-3.5 bg-white/80 backdrop-blur-sm rounded-xl w-full focus:ring-2 focus:ring-primary-500/50 focus:border-transparent border border-gray-200/50 focus:outline-none group-hover:border-transparent transition-all duration-300 z-10"
      />

{/* Search dropdown */}
<div className="relative w-full">
  {searchFocus && city.length === 0 && (
    <div
      className="absolute top-full left-0 w-full bg-white rounded-lg shadow-2xl border border-gray-200 z-[99999]"
    >
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-500 mb-2">
          Popular Cities
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {popularCities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => {
                setCity(city);
                setSearchFocus(false);
              }}
              onMouseDown={(e) => e.preventDefault()}
              className="text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  )}
</div>

    </div>


    {/* Min Price */}
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-500/10 rounded-xl -m-0.5 z-0 group-hover:opacity-100 opacity-0 transition-all duration-500"></div>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <FaRupeeSign className="text-gray-500 group-hover:text-emerald-500 transition-colors" />
      </div>
      <input
        value={min}
        onChange={(e) => handlePriceChange('min', e.target.value)}
        placeholder="Min Price"
        type="number"
        className="relative pl-11 pr-12 py-3.5 bg-white/80 backdrop-blur-sm rounded-xl w-full focus:ring-2 focus:ring-primary-500/50 focus:border-transparent border border-gray-200/50 focus:outline-none group-hover:border-transparent transition-all duration-300 z-10"
      />
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-3 z-10">
        <button 
          type="button" 
          onClick={() => incrementPrice('min')}
          className="text-gray-600 hover:text-emerald-600 p-1.5 hover:bg-gray-100/50 rounded-lg transition-colors"
        >
          <FaChevronUp size={14} />
        </button>
        <button 
          type="button" 
          onClick={() => decrementPrice('min')}
          className="text-gray-600 hover:text-emerald-600 p-1.5 hover:bg-gray-100/50 rounded-lg transition-colors"
        >
          <FaChevronDown size={14} />
        </button>
      </div>
    </div>

    {/* Max Price */}
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-xl -m-0.5 z-0 group-hover:opacity-100 opacity-0 transition-all duration-500"></div>
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
        <FaRupeeSign className="text-gray-500 group-hover:text-amber-500 transition-colors" />
      </div>
      <input
        value={max}
        onChange={(e) => handlePriceChange('max', e.target.value)}
        placeholder="Max Price"
        type="number"
        className="relative pl-11 pr-12 py-3.5 bg-white/80 backdrop-blur-sm rounded-xl w-full focus:ring-2 focus:ring-primary-500/50 focus:border-transparent border border-gray-200/50 focus:outline-none group-hover:border-transparent transition-all duration-300 z-10"
      />
      <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center pr-3 z-10">
        <button 
          type="button" 
          onClick={() => incrementPrice('max')}
          className="text-gray-600 hover:text-amber-600 p-1.5 hover:bg-gray-100/50 rounded-lg transition-colors"
        >
          <FaChevronUp size={14} />
        </button>
        <button 
          type="button" 
          onClick={() => decrementPrice('max')}
          className="text-gray-600 hover:text-amber-600 p-1.5 hover:bg-gray-100/50 rounded-lg transition-colors"
        >
          <FaChevronDown size={14} />
        </button>
      </div>
    </div>

    {/* Search Button */}
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl -m-0.5 z-0 opacity-100 transition-all duration-500"></div>
      <button
        type="submit"
        className="relative flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-xl w-full transition-all duration-300 transform group-hover:scale-[0.98] z-10 shadow-lg hover:shadow-xl"
      >
        <FaSearch className="mr-2 text-lg" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Search Properties
        </span>
      </button>
    </div>
  </form>

  {/* Bottom Links */}
  <div className="mt-6 flex flex-wrap items-center justify-between">
    <button className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center group transition-all duration-300">
      <div className="mr-2 p-1.5 bg-gradient-to-r from-primary-100/50 to-primary-200/30 rounded-full group-hover:from-primary-200/50 group-hover:to-primary-300/30 transition-all duration-500 shadow-inner">
        <FaHeart className="text-primary-600 group-hover:text-primary-700 transition-colors" size={14} />
      </div>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
        Save your favourites
      </span>
    </button>
    <div className="text-sm text-gray-500 flex items-center">
      <span className="hidden sm:inline">Continue last search:</span>
      <button className="text-primary-600 hover:text-primary-800 ml-1.5 flex items-center group transition-all duration-300">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-500">
          Mumbai, Maharashtra...
        </span>
        <FaChevronRight className="ml-1.5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300" size={12} />
      </button>
    </div>
  </div>
</div>

    {/* Premium Features Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 z-0">
  {/* Box Picks */}
  <div className="relative z-0 group overflow-hidden bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl border border-gray-200/30 hover:border-transparent transition-all duration-500 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-blue-300/20 to-purple-400/10 group-hover:from-blue-400/30 group-hover:to-purple-500/20 transition-all duration-1000"></div>
    <div className="relative z-10">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-300/30 group-hover:shadow-blue-400/40 transition-all duration-500">
        <MdApartment className="text-white text-3xl" />
      </div>
      <h3 className="font-bold text-gray-800 text-xl mb-3 text-center group-hover:text-gray-900 transition-colors">Box Picks</h3>
      <p className="text-sm text-gray-600 text-center group-hover:text-gray-700 transition-colors">Curated premium listings</p>
      <div className="mt-5 flex justify-center">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-blue-100/50 to-blue-200/30 text-blue-800 rounded-full backdrop-blur-sm border border-blue-200/50 group-hover:from-blue-200/60 group-hover:to-blue-300/40 transition-all duration-500">
          Exclusive Picks
        </span>
      </div>
    </div>
  </div>

  {/* High Demand */}
  <div className="relative z-0 group overflow-hidden bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl border border-gray-200/30 hover:border-transparent transition-all duration-500 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-red-300/20 to-pink-400/10 group-hover:from-red-400/30 group-hover:to-pink-500/20 transition-all duration-1000"></div>
    <div className="relative z-10">
      <div className="bg-gradient-to-br from-red-500 via-red-600 to-red-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-300/30 group-hover:shadow-red-400/40 transition-all duration-500">
        <FaMapMarkerAlt className="text-white text-3xl" />
      </div>
      <h3 className="font-bold text-gray-800 text-xl mb-3 text-center group-hover:text-gray-900 transition-colors">High Demand</h3>
      <p className="text-sm text-gray-600 text-center group-hover:text-gray-700 transition-colors">Trending properties</p>
      <div className="mt-5 flex justify-center">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-red-100/50 to-red-200/30 text-red-800 rounded-full backdrop-blur-sm border border-red-200/50 group-hover:from-red-200/60 group-hover:to-red-300/40 transition-all duration-500">
          Hot Properties
        </span>
      </div>
    </div>
  </div>

  {/* Top Sellers */}
  <div className="relative z-0 group overflow-hidden bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl border border-gray-200/30 hover:border-transparent transition-all duration-500 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-emerald-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-green-300/20 to-emerald-400/10 group-hover:from-green-400/30 group-hover:to-emerald-500/20 transition-all duration-1000"></div>
    <div className="relative z-10">
      <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-300/30 group-hover:shadow-green-400/40 transition-all duration-500">
        <MdSell className="text-white text-3xl" />
      </div>
      <h3 className="font-bold text-gray-800 text-xl mb-3 text-center group-hover:text-gray-900 transition-colors">Top Sellers</h3>
      <p className="text-sm text-gray-600 text-center group-hover:text-gray-700 transition-colors">Trusted developers</p>
      <div className="mt-5 flex justify-center">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-green-100/50 to-green-200/30 text-green-800 rounded-full backdrop-blur-sm border border-green-200/50 group-hover:from-green-200/60 group-hover:to-green-300/40 transition-all duration-500">
          Verified Partners
        </span>
      </div>
    </div>
  </div>

  {/* How it works */}
  <div className="relative z-0 group overflow-hidden bg-gradient-to-br from-white to-gray-50 p-7 rounded-2xl border border-gray-200/30 hover:border-transparent transition-all duration-500 hover:shadow-2xl">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 to-yellow-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-300/20 to-yellow-400/10 group-hover:from-amber-400/30 group-hover:to-yellow-500/20 transition-all duration-1000"></div>
    <div className="relative z-10">
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-amber-300/30 group-hover:shadow-amber-400/40 transition-all duration-500">
        <MdHomeWork className="text-white text-3xl" />
      </div>
      <h3 className="font-bold text-gray-800 text-xl mb-3 text-center group-hover:text-gray-900 transition-colors">How it works</h3>
      <p className="text-sm text-gray-600 text-center group-hover:text-gray-700 transition-colors">Simple property search</p>
      <div className="mt-5 flex justify-center">
        <span className="inline-block px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-amber-100/50 to-amber-200/30 text-amber-800 rounded-full backdrop-blur-sm border border-amber-200/50 group-hover:from-amber-200/60 group-hover:to-amber-300/40 transition-all duration-500">
          Easy Steps
        </span>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}