import React from 'react';
import { Link } from 'react-router-dom';
import Seller1 from '../assets/Seller1.jpg';
import Seller2 from '../assets/Seller2.jpg';
import Seller3 from '../assets/Seller3.jpg';
import Seller4 from '../assets/Seller4.jpg';
import Seller5 from '../assets/Seller5.jpg';

const RecommendedSellers = () => {
  const sellers = [
    {
      id: 1,
      name: "Vishal Safety",
      company: "1 year Experience",
      stats: "49",
      location: "Pune",
      image: Seller1,
      tagline: "Property Experts",
      ownership: "Proprietorship",
      areas: ["Swaran", "Gujaram", "Bachupally"],
      activeProperties: [
        { type: "3 BHK Flat", price: "1.06 Cr", area: "2031 sq ft", location: "Pune" }
      ]
    },
    {
      id: 2,
      name: "Samrudhii Estates",
      company: "10 years Experience",
      stats: "18",
      location: "Patna",
      image: Seller2,
      tagline: "Premium Homes",
      ownership: "LLP",
      areas: ["Sector-1", "Sector-2", "Manimajra"],
      activeProperties: [
        { type: "2 BHK Flat", price: "65 L", area: "1200 sq ft", location: "Patna" }
      ]
    },
    {
      id: 3,
      name: "Urban Realty",
      company: "5 years Experience",
      stats: "27",
      location: "Goa",
      image: Seller3,
      tagline: "Luxury Living",
      ownership: "Private Limited",
      areas: ["Banjara", "Gachibowli", "Kondapur"],
      activeProperties: [
        { type: "4 BHK Villa", price: "3.5 Cr", area: "4000 sq ft", location: "Goa" }
      ]
    },
    {
      id: 4,
      name: "Green Leaf",
      company: "3 years Experience",
      stats: "12",
      location: "Vizag",
      image: Seller4,
      tagline: "Eco Homes",
      ownership: "Partnership",
      areas: ["Whitefield", "Sarjapur", "Electronic"],
      activeProperties: [
        { type: "2 BHK Flat", price: "80 L", area: "1100 sq ft", location: "Vizag" }
      ]
    },
    {
      id: 5,
      name: "Prime Space",
      company: "8 years Experience",
      stats: "36",
      location: "Delhi",
      image: Seller5,
      tagline: "Dream Homes",
      ownership: "Proprietorship",
      areas: ["Dwarka", "Saket"],
      activeProperties: [
        { type: "3 BHK Flat", price: "1.8 Cr", area: "1800 sq ft", location: "Delhi" }
      ]
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3 relative inline-block">
            <span className="relative z-10">Recommended Sellers</span>
            <span className="absolute bottom-0 left-0 w-full h-3 bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 z-0"></span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our top-rated brokers and agents with proven track records in the real estate market
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {sellers.map((seller) => (
            <div 
              key={seller.id}
              className="transform hover:-translate-y-2 transition-all duration-300 h-full"
            >
              <Link 
                to={`/seller/${seller.id}`}
                className="block h-full"
              >
                <div className="h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col">
                  {/* Header with gradient */}
                  <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    {/* Seller info */}
                    <div className="flex items-center space-x-4 mb-5">
                      <div className="relative">
                        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-md">
                          <img 
                            src={seller.image} 
                            alt={seller.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                          ★ 4.9
                        </div>
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{seller.name}</h3>
                        <p className="text-gray-500 truncate">{seller.company}</p>
                        <p className="text-sm text-purple-600 font-medium mt-1 truncate">{seller.tagline}</p>
                      </div>
                    </div>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="bg-gray-50 p-3 rounded-lg text-center group-hover:bg-blue-50 transition-colors">
                        <p className="text-2xl font-bold text-gray-900">{seller.stats}</p>
                        <p className="text-gray-500 text-sm">Homes Listed</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center group-hover:bg-blue-50 transition-colors">
                        <p className="text-2xl font-bold text-gray-900">{seller.location}</p>
                        <p className="text-gray-500 text-sm">Location</p>
                      </div>
                    </div>
                    
                    {/* Areas */}
                    <div className="mb-5">
                      <p className="text-sm font-medium text-gray-500 mb-2">Serving Areas:</p>
                      <div className="flex flex-wrap gap-2">
                        {seller.areas.slice(0, 3).map((area, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-gray-100 text-gray-800 px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors truncate"
                            style={{ maxWidth: '100%' }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Active property */}
                    {seller.activeProperties.length > 0 && (
                      <div className="border-t border-gray-100 pt-4 mt-auto">
                        <p className="text-sm font-medium text-gray-500 mb-2">Featured Home:</p>
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 truncate">{seller.activeProperties[0].type}</p>
                          <p className="text-sm text-gray-600 truncate">{seller.activeProperties[0].location}</p>
                          <div className="flex justify-between mt-2">
                            <span className="text-sm font-medium text-gray-900 truncate">{seller.activeProperties[0].price}</span>
                            <span className="text-sm text-gray-500 truncate">{seller.activeProperties[0].area}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Contact button */}
                  <div className="p-6 pt-0">
                    <button 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-[1.02] shadow-md hover:shadow-lg"
                      onClick={(e) => e.preventDefault()}
                    >
                      Contact Agent
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-full hover:bg-gray-50 transition-colors">
            View All Top Agents
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecommendedSellers;