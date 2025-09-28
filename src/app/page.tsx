import SchoolUI from '@/components/school-ui'
import HeroSection from '@/components/hero-section'
import MainPage from '@/components/main-page'
import LearningCards from '@/components/learning-cards'
import ComingSoonBanner from '@/components/comming-soon-banner'
import FAQSection from '@/components/faq-section'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <SchoolUI />
      <MainPage />
      <LearningCards />
      <ComingSoonBanner />
      <FAQSection />
    </div>
  )
}

export default Home;
