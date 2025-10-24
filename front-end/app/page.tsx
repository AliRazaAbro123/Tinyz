import BottomSection from "@/components/BottomSection";
import Footer from "@/components/Footer";
import MiddleSection from "@/components/MiddleSection";
import TopSection from "@/components/TopSection";
import React from "react";

function page() {
  return (
    <div>
      <TopSection />
      <MiddleSection />
      <BottomSection />
      <Footer />
    </div>
  );
}

export default page;
