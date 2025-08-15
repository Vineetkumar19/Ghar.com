import { useState } from 'react';
import { FaEdit, FaGooglePlay, FaApple, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaCrown, FaGem, FaStar, FaShieldAlt } from 'react-icons/fa';
import { MdLocationPin, MdEmail, MdPhone, MdOutlineWorkspacePremium } from 'react-icons/md';

export default function ProfileSection() {
  const [isEditing, setIsEditing] = useState(false);
  const [isHoveringPremium, setIsHoveringPremium] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Vineet Kumar Das',
    email: 'vineetdas1344@gmail.com',
    phone: '+91-81045XXX04',
    location: 'New Delhi',
    bio: 'Full-stack developer exploring real estate: UX.',
    premium: false
  });

  const stats = {
    contacted: 20,
    seen: 17,
    saved: 3,
    searches: 1
  };

  const premiumBenefits = [
    { icon: <FaGem className="text-purple-400" />, text: "Exclusive Property Listings" },
    { icon: <FaShieldAlt className="text-blue-400" />, text: "Verified Owners Only" },
    { icon: <FaStar className="text-yellow-400" />, text: "Priority Customer Support" },
    { icon: <MdOutlineWorkspacePremium className="text-pink-500" />, text: "Premium Badge on Profile" }
  ];

  const recentSearches = [
    {
      price: '₹14.99 L – 24.5 L',
      name: 'Nirman Signature',
      developer: 'Shree Sha Developers',
      location: 'Badlapur West, Beyond Thane',
      premium: true
    },
    {
      price: '₹10.25 L – 23.8 L',
      name: 'Vishnu Vatika NX Win',
      developer: 'Vishnu Group',
      location: 'Badlapur West, Beyond Thane',
      premium: false
    }
  ];

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                  <button 
                    onClick={handleEdit}
                    className="text-primary-600 hover:text-primary-800 flex items-center transition-colors duration-200"
                  >
                    <FaEdit className="mr-1" /> Edit
                  </button>
                </div>

                <div className="mt-6 space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={userData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          name="location"
                          value={userData.location}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                          name="bio"
                          value={userData.bio}
                          onChange={handleInputChange}
                          rows="3"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                        >
                          Save Changes
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <MdEmail className="text-gray-500 mr-3 text-lg" />
                        <span className="text-gray-700">{userData.email}</span>
                      </div>
                      <div className="flex items-center">
                        <MdPhone className="text-gray-500 mr-3 text-lg" />
                        <span className="text-gray-700">{userData.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <MdLocationPin className="text-gray-500 mr-3 text-lg" />
                        <span className="text-gray-700">{userData.location}</span>
                      </div>
                      <p className="text-gray-600 mt-4">{userData.bio}</p>
                    </>
                  )}
                </div>

                {!userData.premium && (
                  <div 
                    className="mt-8 relative group"
                    onMouseEnter={() => setIsHoveringPremium(true)}
                    onMouseLeave={() => setIsHoveringPremium(false)}
                  >
                    <div className={`absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-xl blur-lg opacity-80 transition-all duration-500 ${isHoveringPremium ? 'opacity-100 scale-105' : ''}`}></div>
                    <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-2xl overflow-hidden">
                      <div className="absolute top-0 right-0 -mr-6 -mt-6 bg-yellow-500 text-gray-900 font-bold px-4 py-1 transform rotate-12 shadow-lg">
                        HOT DEAL
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <FaCrown className="text-yellow-400 text-4xl mb-3 animate-pulse" />
                        <h3 className="text-2xl font-bold text-white mb-2">Go Premium</h3>
                        <p className="text-gray-300 mb-4">Unlock exclusive real estate opportunities</p>
                        
                        <div className="w-full mb-6">
                          {premiumBenefits.map((benefit, index) => (
                            <div key={index} className="flex items-center mb-2">
                              <span className="mr-3">{benefit.icon}</span>
                              <span className="text-gray-200">{benefit.text}</span>
                            </div>
                          ))}
                        </div>

                        <div className="relative w-full">
                          <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg opacity-60 transition-all duration-300 ${isHoveringPremium ? 'opacity-80' : ''}`}></div>
                          <button className="relative w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center">
                            <FaCrown className="mr-2" />
                            Upgrade Now - ₹999/month
                          </button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">7-day money back guarantee</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6 border border-gray-100">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-primary-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {[
                    "Zero Brokerage Properties",
                    "My Transactions",
                    "My Reviews",
                    "Residential Packages",
                    "Housing Edge",
                    "Services",
                    "Top Search",
                    "Unsubscribe Alerts",
                    "Housing Advice",
                    "Report a Fraud",
                    "Visit Help Center",
                    "Log Out"
                  ].map((link, index) => (
                    <li key={index}>
                      <a href="#" className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200">
                        <svg className="w-4 h-4 mr-2 text-primary-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* App Download */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mt-6 border border-gray-100">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Download Housing App</h3>
                <div className="flex space-x-4">
                  <a href="#" className="flex-1 flex items-center justify-center bg-black text-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-900 transition-colors duration-200">
                    <FaApple className="mr-2 text-xl" /> 
                    <div>
                      <div className="text-xs">Download on the</div>
                      <div className="font-bold">App Store</div>
                    </div>
                  </a>
                  <a href="#" className="flex-1 flex items-center justify-center bg-black text-white px-4 py-3 rounded-lg shadow-md hover:bg-gray-900 transition-colors duration-200">
                    <FaGooglePlay className="mr-2 text-xl" />
                    <div>
                      <div className="text-xs">Get it on</div>
                      <div className="font-bold">Google Play</div>
                    </div>
                  </a>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200">
                      <FaFacebook size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors duration-200">
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-colors duration-200">
                      <FaLinkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
                      <FaInstagram size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">My Activity</h2>
                
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <p className="text-sm text-gray-600">Contacted Properties</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <p className="text-sm text-gray-600">Seen Properties</p>
                    <p className="text-2xl font-bold text-green-600">{stats.seen}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <p className="text-sm text-gray-600">Saved Properties</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.saved}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                    <p className="text-sm text-gray-600">Recent Searches</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.searches}</p>
                  </div>
                </div>

                {/* Recent Searches */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Recent Searches</h3>
                  <button className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
                    View All
                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {recentSearches.map((search, index) => (
                    <div key={index} className={`border rounded-xl p-5 hover:shadow-lg transition-all duration-200 ${search.premium ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-white' : 'border-gray-200'}`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-gray-500">{search.price}</p>
                            {search.premium && (
                              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <FaCrown className="mr-1" /> Premium
                              </span>
                            )}
                          </div>
                          <h4 className="text-lg font-bold text-gray-800 mt-1">{search.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">by {search.developer}</p>
                          <p className="text-sm text-gray-600 mt-1 flex items-center">
                            <MdLocationPin className="mr-1" /> {search.location}
                          </p>
                        </div>
                        <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${search.premium ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white hover:shadow-md' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}>
                          {search.premium ? 'Exclusive Offer' : 'Contact'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}