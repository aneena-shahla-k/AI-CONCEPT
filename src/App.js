import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";
import CompanyHome from "./pages/CompanyHome";

export default function App() {
  useEffect(() => {
    AOS.init({
      offset: 120, 
      duration: 400, 
      easing: "ease", 
      once: false, 
    });
  }, []);

  return <CompanyHome />;
}