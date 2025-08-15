export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-indigo-600 rounded-full filter blur-[100px] opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 relative z-10">
        {/* Brand Info - Reduced to 1 column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-white">G</span>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                <span>Ghar</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">.com</span>
              </h2>
              <p className="text-sm text-gray-400">Find and book homes across India</p>
            </div>
          </div>
          
       
          
          <div className="flex flex-col gap-3">
            <button className="group bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 shadow hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35l13.5-6.5c.52-.25 1.12-.2 1.6.13.48.33.76.87.76 1.45v17c0 .59-.34 1.11-.84 1.35l-13.5 6.5c-.52.25-1.12.2-1.6-.13-.48-.33-.76-.87-.76-1.45z"></path>
                <path d="M8 16h8v1.5c0 .83-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5v-1.5z"></path>
              </svg>
              <div className="text-left">
                <div className="text-xs">GET IT ON</div>
                <div className="text-sm font-bold">Google Play</div>
              </div>
            </button>
            
            <button className="group bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 shadow hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"></path>
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-sm font-bold">App Store</div>
              </div>
            </button>
          </div>
        </div>

        {/* Quick Links - Moved to middle */}
        <div className="md:col-span-1">
          <h3 className="text-white text-lg font-bold mb-4 pb-2 border-b border-gray-700 relative">
            Quick Links
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
          </h3>
          <ul className="space-y-2">
            {['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Chennai'].map((city) => (
              <li key={city}>
                <a href="#" className="text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  Flats in {city}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore - Moved to middle */}
        <div className="md:col-span-1">
          <h3 className="text-white text-lg font-bold mb-4 pb-2 border-b border-gray-700 relative">
            Explore
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
          </h3>
          <ul className="space-y-2">
            {['News', 'Home Loans', 'Projects', 'City Data', 'Contact Us'].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact - Moved to top right and compacted */}
        <div className="md:col-span-1">
          <h3 className="text-white text-lg font-bold mb-4 pb-2 border-b border-gray-700 relative">
            Contact
            <span className="absolute bottom-0 left-0 w-10 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600"></span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <a href="mailto:support@ghar.com" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">support@ghar.com</a>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md">
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <a href="tel:+919876543210" className="text-sm text-gray-400 hover:text-white transition-colors duration-300">+91 98765 43210</a>
            </div>
          </div>

          {/* Social Icons - Compact version */}
          <div className="mt-6 flex gap-3">
            {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social) => (
              <a 
                key={social}
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300 hover:-translate-y-0.5 shadow hover:shadow-md"
                aria-label={social}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {social === 'Facebook' && <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>}
                  {social === 'Instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>}
                  {social === 'Twitter' && <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>}
                  {social === 'LinkedIn' && <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar - Compact version */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="mb-2 md:mb-0">
            © 2025 Ghar.com • Made by Vineet Kumar Das
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}