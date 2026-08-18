import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CompanyOverview from './components/CompanyOverview';

import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import BlogDetail from './pages/BlogDetail';
import BlogList from './pages/BlogList';
import CareersPage from './pages/CareersPage';
import ProjectDetail from './pages/ProjectDetailPage';
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Activate Smooth Scroll
  useLenis();

  return (
    <Router>
      <CustomCursor />
      
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="min-h-screen bg-dark text-light flex flex-col selection:bg-accent selection:text-dark">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Gioi-thieu" element={<AboutPage />} />
              <Route path="/Dich-vu" element={<ServicesPage />} />
              <Route path="/Du-an" element={<ProjectsPage />} />
              <Route path="/Lien-he" element={<ContactPage />} />
              <Route path="/Tin-tuc/:slug" element={<BlogDetail />} />
              <Route path="/Tin-tuc" element={<BlogList />} />
              <Route path="/Tong-quan" element={<CompanyOverview />} />
              <Route path="/Tuyen-dung" element={<CareersPage />} />
              <Route path="/Du-an/:slug" element={<ProjectDetail />} />
            </Routes>
            <ScrollToTop />
          </div>
          <Footer />
        </div>
      )}
    </Router>
  );
}