import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiDollarSign, FiHome, FiPieChart, FiMap, FiArrowRight } from 'react-icons/fi';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PropertyTools = () => {
  const tools = [
    {
      id: 1,
      title: "EMI",
      subtitle: "Calculator",
      description: "Calculate your monthly loan payments with precision",
      icon: <FiDollarSign className="text-white" />,
      gradient: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      route: "/emi-calculator"
    },
    {
      id: 2,
      title: "Eligibility",
      subtitle: "Calculator",
      description: "Discover your maximum home loan amount",
      icon: <FiPieChart className="text-white" />,
      gradient: "linear-gradient(135deg, #10B981 0%, #047857 100%)",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      route: "/eligibility-calculator"
    },
    {
      id: 3,
      title: "Affordability",
      subtitle: "Calculator",
      description: "Determine your ideal property budget range",
      icon: <FiHome className="text-white" />,
      gradient: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      route: "/affordability-calculator"
    },
    {
      id: 4,
      title: "Area",
      subtitle: "Calculator",
      description: "Convert between different land measurement units",
      icon: <FiMap className="text-white" />,
      gradient: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
      route: "/area-calculator"
    }
  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500">
              Property Research Tools
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Empower your property journey with our <span className="font-semibold text-gray-700">premium financial calculators</span> designed for modern investors
          </p>
        </motion.div>
        
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {tools.map((tool) => (
            <motion.div 
              key={tool.id}
              variants={item}
              whileHover={{ y: -10 }}
              className="group perspective-1000"
            >
              <Link 
                to={tool.route}
                className="relative block h-full transform-style-preserve-3d transition-all duration-700 group-hover:rotate-x-5"
              >
                {/* Card front */}
                <div className="relative z-10 h-full bg-white rounded-3xl shadow-2xl overflow-hidden transform-style-preserve-3d transition-all duration-700 group-hover:shadow-3xl">
                  {/* Image background with overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={tool.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div 
                      className="absolute inset-0 opacity-70"
                      style={{ background: tool.gradient }}
                    ></div>
                  </div>
                  
                  {/* Icon positioned lower with margin-top */}
                  <div className="absolute top-4 left-6 w-16 h-16 rounded-xl shadow-xl flex items-center justify-center transition-all duration-700 group-hover:-translate-y-2"
                    style={{ background: tool.gradient }}
                  >
                    {tool.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 pt-12">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{tool.title}</h3>
                    <h4 className="text-lg font-semibold text-gray-600 mb-4">{tool.subtitle}</h4>
                    <p className="text-gray-600 mb-8">{tool.description}</p>
                    
                    {/* Animated CTA button */}
                    <div className="relative overflow-hidden rounded-lg">
                      <div 
                        className="absolute inset-0 opacity-20 transition-all duration-500 group-hover:opacity-30"
                        style={{ background: tool.gradient }}
                      ></div>
                      <div className="relative z-10 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-sm">
                        <span className="font-medium text-gray-800">Calculate Now</span>
                        <div className="flex items-center">
                          <span className="w-6 h-px bg-gray-400 transition-all duration-300 group-hover:w-8 group-hover:bg-gray-600 mr-2"></span>
                          <FiArrowRight className="text-gray-600 transition-all duration-300 group-hover:text-gray-800 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card back shadow effect */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 translate-z-10"
                  style={{ 
                    background: tool.gradient,
                    transform: 'translateZ(-10px)',
                    filter: 'blur(15px)'
                  }}
                ></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating decorative text */}
        <div className="absolute -bottom-10 left-0 right-0 text-center opacity-5">
          <span className="text-[10rem] font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            INVEST WISELY
          </span>
        </div>
      </div>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .translate-z-10 {
          transform: translateZ(-10px);
        }
      `}</style>
    </section>
  );
};

export default PropertyTools;