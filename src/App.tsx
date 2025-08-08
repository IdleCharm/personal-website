import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";

function App() {
  return (
    // <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 text-white">
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-indigo-900 text-white">
      <Hero />
      <Skills />
      <About attributes={["Web Development", "Open Source", "Mentorship"]} />
    </div>
  );
}

export default App;
