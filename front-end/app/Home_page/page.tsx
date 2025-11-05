import React from "react";
import BottomSection from "@/components/BottomSection";
import Footer from "@/components/Footer";
import MiddleSection from "@/components/MiddleSection";
import TopSection from "@/components/TopSection";

function HomePage() {
  return (
    <>
      <div>
        <TopSection />
        <MiddleSection />
        <BottomSection />
        <Footer />
      </div>
    </>
  );
}

export default HomePage;
