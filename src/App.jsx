import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

// Pages
import Home from './pages/Home.jsx';
import Listings from './pages/Listings.jsx';
import Favourites from './pages/Favourites.jsx';
import Profile from './pages/Profile.jsx';
import BookingHistory from './pages/BookingHistory.jsx';
import BookingDetails from './pages/BookingDetails.jsx';
import NotFound from './pages/NotFound.jsx';
import SellerDetail from './components/SellerDetail.jsx';

// Calculators
import EMICalculator from './components/EMICalculator.jsx';
import EligibilityCalculator from './components/EligibilityCalculator.jsx';
import AffordabilityCalculator from './components/AffordabilityCalculator.jsx';
import AreaCalculator from './components/AreaCalculator.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/history" element={<BookingHistory />} />
          <Route path="/booking/:id" element={<BookingDetails />} />
          <Route path="/seller/:id" element={<SellerDetail />} />

          {/* Calculator Pages */}
          <Route path="/emi-calculator" element={<EMICalculator />} />
          <Route path="/eligibility-calculator" element={<EligibilityCalculator />} />
          <Route path="/affordability-calculator" element={<AffordabilityCalculator />} />
          <Route path="/area-calculator" element={<AreaCalculator />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
