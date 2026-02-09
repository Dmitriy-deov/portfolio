import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SkillsSection from './components/SkillsSection';
import MethodologySection from './components/MethodologySection';
import SummaryTable from './components/SummaryTable';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen w-full flex flex-col border-x border-border max-w-[1440px] mx-auto bg-bg-primary">
      <Navigation />
      <main className="flex-grow w-full">
        <Hero />
        <SkillsSection />
        <MethodologySection />
        <SummaryTable />
      </main>
      <Footer />
    </div>
  );
}

export default App;
