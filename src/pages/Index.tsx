import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CoursesSection from "@/components/CoursesSection";
import InternshipSection from "@/components/InternshipSection";
import TimelineSection from "@/components/TimelineSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CampusAmbassadorSection from "@/components/CampusAmbassadorSection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
        isLoggedIn={isLoggedIn}
        onLogout={() => { setIsLoggedIn(false); setUserEmail(""); }}
      />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLogin={(email) => { setIsLoggedIn(true); setUserEmail(email); }}
      />
      <Chatbot />
      
      <HeroSection />
      <AboutSection />
      <CoursesSection />
      <InternshipSection />
      <TimelineSection />
      <TestimonialsSection />
      <CampusAmbassadorSection />
      <Footer />
    </div>
  );
};

export default Index;
