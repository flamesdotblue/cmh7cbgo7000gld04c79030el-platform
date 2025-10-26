import { useState } from 'react';
import { Rocket, Home, Languages, BarChart3, User } from 'lucide-react';
import Hero from './components/Hero';
import TranslationPanel from './components/TranslationPanel';
import Dashboard from './components/Dashboard';
import ProfileCard from './components/ProfileCard';

function App() {
  const [active, setActive] = useState('home');

  const NavButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActive(id)}
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition-colors text-sm md:text-base ${
        active === id
          ? 'bg-black text-white dark:bg-white dark:text-black'
          : 'bg-white/70 text-black hover:bg-white dark:bg-neutral-900/70 dark:text-white dark:hover:bg-neutral-900'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-neutral-100 text-neutral-800 dark:from-neutral-950 dark:to-neutral-900 dark:text-neutral-100">
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 dark:supports-[backdrop-filter]:bg-neutral-950/50 border-b border-black/5 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-400 grid place-items-center text-white shadow">
              <Rocket size={18} />
            </div>
            <div className="text-sm md:text-base">
              <div className="font-bold leading-4">SignBridge</div>
              <div className="text-xs opacity-70">Real-time Sign Language Interpreter</div>
            </div>
          </div>
          <nav className="flex items-center gap-2 md:gap-3">
            <NavButton id="home" label="Home" icon={Home} />
            <NavButton id="translate" label="Translate" icon={Languages} />
            <NavButton id="dashboard" label="Dashboard" icon={BarChart3} />
            <NavButton id="profile" label="Profile" icon={User} />
          </nav>
        </div>
      </header>

      {active === 'home' && <Hero onStart={() => setActive('translate')} />}
      {active === 'translate' && <TranslationPanel />}
      {active === 'dashboard' && <Dashboard />}
      {active === 'profile' && <ProfileCard />}

      <footer className="mt-16 border-t border-black/5 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm opacity-70">
          Built with React, Tailwind CSS, Framer Motion, and Spline. Prototype UI — model/API integration pending.
        </div>
      </footer>
    </div>
  );
}

export default App;
