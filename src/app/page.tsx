import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Stats from '@/components/Stats/Stats';
import GlobalAccent from '@/components/GlobalAccent/GlobalAccent';
import Navigation from '@/components/Navigation/Navigation';
import AccentSystem from '@/components/AccentSystem/AccentSystem';
import AudioEngineering from '@/components/AudioEngineering/AudioEngineering';
import PlatformDemo from '@/components/PlatformDemo/PlatformDemo';
import UseCases from '@/components/UseCases/UseCases';
import ContactUs from '@/components/ContactUs/ContactUs';
import CTAFooter from '@/components/CTAFooter/CTAFooter';
import Timeline from '@/components/Timeline/Timeline';

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <GlobalAccent />
        <Timeline />
        <AudioEngineering />
        <PlatformDemo />
        <UseCases />
        <ContactUs />
        <CTAFooter />
      </main>
    </>
  );
}
