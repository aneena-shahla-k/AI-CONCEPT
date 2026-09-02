import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

import CompanyNavbar from "./components/CompanyNavbar";
import CompanyHome from "./pages/CompanyHome";
import GrowthPage from "./pages/GrowthPage";
import FinalCTA from "./components/FinalCTA";
import AIPageWrapper from "./pages/AIPageWrapper";
import IndustriesPageWrapper from "./pages/IndustriesPageWrapper";
import OurWorkPageWrapper from "./pages/OurWorkPageWrapper";
import AboutPageWrapper from "./pages/AboutPageWrapper";
import ContactPageWrapper from "./pages/ContactPageWrapper";
import SolutionsDetailPage from "./components/Solutions/SolutionsDetailPage";
import GlobalCursor from "./components/common/GlobalCursor";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [activeSolutionKey, setActiveSolutionKey] = useState("website-development");
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 120,
      duration: 400,
      easing: "ease",
      once: false,
    });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [currentPage]);

  // Automatic scroll to top whenever page or solution changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [currentPage, activeSolutionKey]);

  const handleOpenBooking = () => {
    window.open("mailto:info@aiconcept.in?subject=Book%201:1%20Strategy%20Call", "_blank");
  };

  const handleOpenProject = () => {
    setIsProjectModalOpen(true);
  };

  const handleCloseProject = () => {
    setIsProjectModalOpen(false);
  };

  const handleNavigate = (page, param) => {
    setCurrentPage(page);
    if (param) {
      setActiveSolutionKey(param);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <div className="app-layout">
      {/* Global Cursor */}
      <GlobalCursor />

      {/* Global Floating Navigation */}
      <CompanyNavbar
        onOpenBooking={handleOpenBooking}
        isOpenProjectDirectly={isProjectModalOpen}
        onCloseProjectModal={handleCloseProject}
        onNavigate={handleNavigate}
        currentPage={currentPage}
      />

      {currentPage === "solution-detail" ? (
        <main key={`solution-${activeSolutionKey}`} style={{ minHeight: "80vh" }}>
          <SolutionsDetailPage
            solutionKey={activeSolutionKey}
            onBack={() => handleNavigate("home")}
            onOpenProject={handleOpenProject}
          />
        </main>
      ) : currentPage === "growth-plans" ? (
        <main key="growth-plans" style={{ minHeight: "80vh" }}>
          <GrowthPage onOpenBooking={handleOpenBooking} onOpenProject={handleOpenProject} />
        </main>
      ) : currentPage === "ai" ? (
        <main key="ai" style={{ minHeight: "80vh", paddingTop: "80px" }}>
          <AIPageWrapper onOpenBooking={handleOpenBooking} onOpenProject={handleOpenProject} />
        </main>
      ) : currentPage === "industries" ? (
        <main key="industries" style={{ minHeight: "80vh", paddingTop: "80px" }}>
          <IndustriesPageWrapper onOpenBooking={handleOpenBooking} onOpenProject={handleOpenProject} />
        </main>
      ) : currentPage === "work" ? (
        <main key="work" style={{ minHeight: "80vh" }}>
          <OurWorkPageWrapper onOpenBooking={handleOpenBooking} onOpenProject={handleOpenProject} />
        </main>
      ) : currentPage === "about" ? (
        <main key="about" style={{ minHeight: "80vh" }}>
          <AboutPageWrapper onOpenBooking={handleOpenBooking} onOpenProject={handleOpenProject} />
        </main>
      ) : currentPage === "contact" ? (
        <main key="contact" style={{ minHeight: "80vh" }}>
          <ContactPageWrapper />
        </main>
      ) : (
        <main key="home">
          <CompanyHome onNavigate={handleNavigate} onOpenProject={handleOpenProject} />
        </main>
      )}

      {/* Global Footer & Conversion CTA */}
      <div id="contact">
        <FinalCTA
          onOpenBooking={handleOpenBooking}
          onOpenProject={handleOpenProject}
        />
      </div>
    </div>
  );
}