import SchoolUI from '@/components/SchoolUI'
import HeroSection from '@/components/HeroSection'
import React from 'react'
import MainPage from '@/components/MainPage'
import LearningCards from '@/components/LearningCards'
import ComingSoonBanner from '@/components/CommingSoonBanner'
import FAQSection from '@/components/FAQSection'

const Home = () => {
  return (
    <div>
     
      <HeroSection/>
      <SchoolUI/>
      <MainPage/>
      <LearningCards/>
      <ComingSoonBanner/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default Home