import React from 'react';
import { useNavigate } from 'react-router-dom';
import Project1 from '../assets/Project1.jpg';
import Project2 from '../assets/Project2.jpg';
import Project3 from '../assets/Project3.jpg';
import Project4 from '../assets/Project4.jpg';
import Project5 from '../assets/Project1.jpg';
import Project6 from '../assets/Project2.jpg';

const HighDemandProjects = () => {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      name: "5 Gambhir Skyline A...",
      builder: "by 5. Gambhir Buildtech",
      type: "2, 3, 4 BHK Builder Room",
      location: "Dwarka Mor, South West Delhi",
      price: "₹35.01 - 1.1 Cr",
      image: Project1
    },
    {
      id: 2,
      name: "Zotra Lavins",
      builder: "by Lisdamman Polymes Pvt..",
      type: "4 BHK Villa",
      location: "RR Magni, Bangalore",
      price: "₹4.85 Cr",
      image: Project2
    },
    {
      id: 3,
      name: "Reviva",
      builder: "by SSI",
      type: "2, 3 BHK Apartments",
      location: "Rommasandra, South Bangalore",
      price: "₹70.45 L - 97.55 L",
      image: Project3
    },
    {
      id: 4,
      name: "Dashbhuja",
      builder: "by Gangoteve Homes",
      type: "2, 3 BHK Apartments",
      location: "Kothrud, Paud Road, Pune",
      price: "₹1.14 Cr - 1.83 Cr",
      image: Project4
    },
    {
      id: 5,
      name: "Sreenidhi Neccity Gr...",
      builder: "by ANANTIMA SPICES",
      type: "Residential Plots",
      location: "Salahrypet, Hyderabad",
      price: "₹36.08 L - 3.17 Cr",
      image: Project1
    },
    {
      id: 6,
      name: "BPTP Gaia Residence...",
      builder: "by BPTP Limited",
      type: "3 BHK Apartment",
      location: "Sector 102, Dwarka Expressway",
      price: "₹3.85 Cr",
      image: Project2
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50/90 to-white">
      <div className="container mx-auto px-0"> {/* Changed px-4 to px-0 */}
        <div className="text-center mb-12 px-4"> {/* Added px-4 here */}
          <h2 className="text-4xl font-bold text-gray-900 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
            High-demand projects to invest now
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Leading projects in high demand with exclusive investment opportunities
          </p>
        </div>

        <div className="relative">
          {/* Fixed gradient fade effects */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none h-full"></div>
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none h-full"></div>

          <div className="flex overflow-x-auto pb-8 scrollbar-hide">
            <div className="flex space-x-8 px-8"> {/* Added px-8 here */}
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200/30 hover:border-transparent relative"
                  onClick={() => navigate(`/booking/${project.id}`)}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/5 via-gray-700/5 to-gray-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Project Image with Enhanced Gradient Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    
                    {/* Premium Badge with hover effect */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg group-hover:scale-105 transition-transform duration-300">
                      PREMIUM
                    </div>
                    
                    {/* Price Tag with hover effect */}
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-gray-900/95 to-gray-700/95 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg group-hover:translate-y-1 transition-transform duration-300">
                      {project.price}
                    </div>
                  </div>

                  {/* Project Details with Enhanced Gradient */}
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50/30">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 mb-1 line-clamp-1">
                      {project.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3 group-hover:text-gray-600 transition-colors duration-300">
                      {project.builder}
                    </p>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-sm bg-gray-900 text-white px-3 py-1 rounded-full font-medium group-hover:bg-gray-800 transition-colors duration-300">
                        {project.type.split(',')[0].trim()}
                      </span>
                      {project.type.includes(',') && (
                        <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                          +{project.type.split(',').length - 1} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-start mb-4">
                      <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0 group-hover:text-primary-500 transition-colors duration-300" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <p className="text-sm text-gray-600 line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                        {project.location}
                      </p>
                    </div>

                    <button className="w-full mt-2 text-center font-medium text-white bg-gradient-to-r from-gray-900 to-gray-700 hover:from-primary-600 hover:to-primary-500 rounded-lg px-5 py-2.5 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HighDemandProjects;