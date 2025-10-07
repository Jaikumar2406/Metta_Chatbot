import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Character from './components/Character';
import Chat from './pages/Chat';
import About from './pages/About';
import Community from './pages/Community';

function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  // Handle mouse movement for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      
      // Update ref for animation frame
      mouseRef.current = { x, y };
      
      // Update state with debounce for UI updates
      setMouse({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Character mouse={mouseRef} />
          </Canvas>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="p-6">
            <nav className="flex justify-between items-center">
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to="/">MeTTa</Link>
              </motion.div>
              
              <motion.ul className="flex space-x-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <li><Link to="/" className="hover:text-gray-300 transition-colors">Chat</Link></li>
                <li><Link to="/about" className="hover:text-gray-300 transition-colors">About</Link></li>
                <li><Link to="/community" className="hover:text-gray-300 transition-colors">Community</Link></li>
              </motion.ul>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Chat />} />
              <Route path="/about" element={<About />} />
              <Route path="/community" element={<Community />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="p-6 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} MeTTa. All rights reserved.</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
