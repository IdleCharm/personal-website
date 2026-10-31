import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 text-white">
      <Hero />
      <Skills />
      <About attributes={["Web Development", "Open Source", "Mentorship"]} />
      <Contact />
    </div>
  );
}

export default App;
