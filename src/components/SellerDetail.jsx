import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaBuilding, FaClock, FaShieldAlt, FaMapMarkerAlt, FaChevronRight, FaWhatsapp, FaStar, FaRegStar, FaRegHeart, FaHeart } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

const SellerDetail = () => {
  const { id } = useParams();
  const [favorites, setFavorites] = useState({});
  const [rating, setRating] = useState(4);

  // Mock data - replace with API call
  const seller = {
    id: 1,
    name: "Vistara Properties",
    tagline: "MICHELOS COVER PRO",
    stats: [
      "100+ Buyers Served",
      "Trusted Agent",
      "Authentic Listings",
      "Highly Professional"
    ],
    experience: "1 year",
    propertiesCount: 49,
    ownership: "Proprietorship",
    rating: 4.7,
    reviews: 128,
    verified: true,
    areas: [
      "Suraram", "Gajularamaram", "Bachupally", 
      "Mettakanigudem", "Jagadgiri Gutta", "Bowrampet", "Kaiser Nagar"
    ],
    activeProperties: [
      {
        id: 1,
        type: "3 BHK Flat",
        location: "Mettakanigudem, Hyderabad",
        price: "1.06 Cr",
        area: "2031 sq ft",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        features: ["Swimming Pool", "Gym", "24/7 Security", "Park"],
        premium: true
      },
      {
        id: 2,
        type: "3 BHK Flat",
        location: "Mettakanigudem, Hyderabad",
        price: "99.06 L",
        area: "1906 sq ft",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        features: ["Club House", "Children's Play Area", "Power Backup"],
        premium: false
      },
      {
        id: 3,
        type: "3 BHK Flat",
        location: "Mettakanigudem, Hyderabad",
        price: "1.01 Cr",
        area: "1946 sq ft",
        image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        features: ["Landscaped Garden", "Jogging Track", "Rain Water Harvesting"],
        premium: true
      }
    ]
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section with Animated Gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 rounded-3xl p-8 mb-10 text-white shadow-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient-x"></div>
        </div>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center mb-2">
              <h1 className="text-4xl font-bold mr-3">{seller.name}</h1>
              {seller.verified && (
                <RiVerifiedBadgeFill className="text-blue-300 text-2xl" title="Verified Agent" />
              )}
            </div>
            <p className="text-xl opacity-90 mb-6">{seller.tagline}</p>
            
            <div className="flex flex-wrap gap-3">
              {seller.stats.map((stat, index) => (
                <span 
                  key={index} 
                  className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium hover:bg-opacity-30 transition-all duration-200 flex items-center"
                >
                  <FaStar className="mr-1 text-yellow-300" /> {stat}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="relative overflow-hidden group bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <span className="relative z-10 flex items-center">
                <FaWhatsapp className="mr-2 text-lg" /> Contact Agent
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-300"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* About Agent Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group">
          <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-400 rounded-full opacity-20"></div>
            <div className="absolute -right-5 -top-5 w-20 h-20 bg-blue-300 rounded-full opacity-30"></div>
            <h2 className="text-2xl font-bold relative">About Agent</h2>
          </div>
          <div className="p-6 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl shadow-sm">
                <FaClock className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Experience</h3>
                <p className="text-xl font-semibold">{seller.experience}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl shadow-sm">
                <FaBuilding className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Properties</h3>
                <p className="text-xl font-semibold">{seller.propertiesCount}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl shadow-sm">
                <FaShieldAlt className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Firm Ownership</h3>
                <p className="text-xl font-semibold">{seller.ownership}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  i < Math.floor(seller.rating) ? 
                    <FaStar key={i} className="text-yellow-400" /> : 
                    <FaRegStar key={i} className="text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">{seller.rating} ({seller.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Areas of Operation Card */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100">
          <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://uploads-ssl.webflow.com/5e6befdae8c10b0d1c1adf5b/5e6f5c8b1f5108b2c0d5a5a3_map-pattern.svg')]"></div>
            <div className="relative flex items-center justify-between">
              <h2 className="text-2xl font-bold">Areas of Operation</h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm opacity-90">Covering {seller.areas.length} prime locations</span>
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="relative">
              {/* Map-inspired background */}
              <div className="absolute inset-0 opacity-5 bg-[url('https://uploads-ssl.webflow.com/5e6befdae8c10b0d1c1adf5b/5e6f5c8b1f5108b2c0d5a5a3_map-pattern.svg')]"></div>
              
              {/* Location grid with interactive elements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
                {seller.areas.map((area, index) => (
                  <div 
                    key={index} 
                    className="relative group transition-all duration-300"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative p-4 border border-gray-100 rounded-xl bg-white hover:shadow-md transition-all duration-300 group-hover:border-transparent group-hover:-translate-y-1">
                      <div className="flex items-start space-x-3">
                        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 rounded-lg flex-shrink-0">
                          <FaMapMarkerAlt className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{area}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {Math.floor(Math.random() * 20) + 5} properties available
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center">
                          View properties <FaChevronRight className="ml-1 text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Premium location highlight */}
              <div className="mt-8 relative z-10">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 text-white overflow-hidden">
                  <div className="absolute right-0 top-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                  <div className="absolute right-0 bottom-0 w-16 h-16 bg-white/10 rounded-full -mr-6 -mb-6"></div>
                  <div className="relative">
                    <h3 className="font-bold text-lg mb-2">Premium Coverage Area</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Our most active area with the highest number of premium properties
                    </p>
                    <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-yellow-300 mr-2" />
                        <span className="font-medium">{seller.areas[0]}</span>
                        <span className="ml-auto bg-yellow-400/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                          Hot Area
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Properties Section */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-10 hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://uploads-ssl.webflow.com/5e6befdae8c10b0d1c1adf5b/5e6f5c8b1f5108b2c0d5a5a3_map-pattern.svg')]"></div>
          <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center">
            <h2 className="text-2xl font-bold">ACTIVE PROPERTIES ({seller.propertiesCount})</h2>
            <button className="mt-4 md:mt-0 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              View All Properties
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {seller.activeProperties.map((property) => (
              <div 
                key={property.id} 
                className={`relative border rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group ${property.premium ? 'border-2 border-yellow-300' : 'border-gray-200'}`}
              >
                {property.premium && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                    PREMIUM
                  </div>
                )}
                <button 
                  onClick={() => toggleFavorite(property.id)} 
                  className="absolute top-4 right-4 bg-white bg-opacity-80 p-2 rounded-full z-10 hover:bg-opacity-100 transition-all duration-200 shadow-md"
                >
                  {favorites[property.id] ? 
                    <FaHeart className="text-red-500" /> : 
                    <FaRegHeart className="text-gray-600" />}
                </button>
                
                <div className="h-60 bg-gray-200 overflow-hidden relative">
                  <img 
                    src={property.image} 
                    alt={property.type} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="font-bold text-lg text-white">{property.type}</h3>
                    <p className="text-white/90 text-sm">{property.location}</p>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Built Up Area</p>
                      <p className="font-medium">{property.area}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-500 text-sm">Price</p>
                      <p className="text-xl font-bold text-blue-600">{property.price}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {property.features.map((feature, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium flex items-center justify-center transition-all duration-300 group-hover:shadow-md">
                    View Details <FaChevronRight className="ml-2 text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full opacity-10 -mr-10 -mt-10"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-200 rounded-full opacity-10 -ml-10 -mb-10"></div>
        
        <div className="relative text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Contact {seller.name}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch with our professional team for personalized assistance with your property needs.
          </p>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl shadow-sm">
                <FaPhone className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Phone</h3>
                <p className="text-xl font-semibold">+91 XXXXXXXXXX</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  <FaWhatsapp className="mr-1" /> Chat on WhatsApp
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl shadow-sm">
                <FaEnvelope className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-500">Email</h3>
                <p className="text-xl font-semibold">contact@{seller.name.toLowerCase().replace(/\s/g, '')}.com</p>
                <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm flex items-center">
                  Send Email Directly
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative text-center">
          <button className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-10 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <span className="relative z-10">Send Message</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerDetail;