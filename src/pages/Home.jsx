
import SearchBar from '../components/SearchBar.jsx';
import { Link } from 'react-router-dom';
import data from '../data/properties.json';
import PropertyCard from '../components/PropertyCard.jsx';

import HighDemandProjects from '../components/HighDemandProjects';
import RecommendedSellers from '../components/RecommendedSellers';
import PropertyTools from '../components/PropertyTools';

export default function Home() {
  const top = data.slice(0, 8);

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section id="hero" className="bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <SearchBar />
        </div>
      </section>

      {/* Top Homes Section */}
      <section id="top" className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Top Homes</h2>
            <Link to="/listings" className="text-primary-600 hover:underline font-medium">
              View all
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {top.map((h) => (
              <PropertyCard key={h.id} home={h} />
            ))}
          </div>
        </div>
      </section>

      {/* High Demand Projects Section */}
      <section id="demand" className="py-12 bg-gray-50">
        <HighDemandProjects />
      </section>

      {/* Recommended Sellers Section */}
      <section id="sellers" className="py-12 bg-gray-50">
        <RecommendedSellers />
      </section>

      {/* Property Tools Section */}
      <section id="tools" className="py-12 bg-white">
        <PropertyTools />
      </section>
   
    </div>
  );
}
