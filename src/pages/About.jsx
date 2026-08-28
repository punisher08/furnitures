import React from 'react';
import Header from '../layouts/Header';
import AboutUs from '../components/AboutUs';
import BeforeAfterSection from '../components/BeforeAfter';
import Footer from '../components/Footer';



export default function Front() {
  return(
    <div>
        <Header />
        <AboutUs />
        <BeforeAfterSection />
         <Footer />
    </div>
  )
}