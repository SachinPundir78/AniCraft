import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/30 backdrop-blur-lg shadow-2xl border-b border-yellow-400/10 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-1">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <a href="/" className="flex items-center space-x-3 group">
            <img
              src="/icon.png"
              alt="AniCraft logo"
              className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-yellow-400 transition-colors duration-300">
                AniCraft
              </h1>
              <span className="text-xs text-yellow-400/80 font-medium tracking-wider">
                Create Beyond Ordinary Limits
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-white/90 hover:text-yellow-400 transition-all duration-300 font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="/overlay"
              className="text-white/90 hover:text-yellow-400 transition-all duration-300 font-medium relative group"
            >
              Editor
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="/ghibli"
              className="text-white/90 hover:text-yellow-400 transition-all duration-300 font-medium relative group"
            >
              Ghibli Art
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a
              href="https://portfolio-sachin-ruby.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/90 hover:text-yellow-400 transition-all duration-300 font-medium relative group flex items-center gap-1"
            >
              Contact
              <ExternalLink className="w-3 h-3" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="https://github.com/SachinPundir78/AniCraft"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-yellow-400/50 hover:scale-105 transition-all duration-300"
          >
            <FaGithub className="w-4 h-4" />
            Star on GitHub
          </a>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors duration-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-yellow-400/10 md:hidden z-40 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col py-6 px-6 space-y-3">
              <a
                href="/"
                className="block text-white/90 hover:text-yellow-400 transition-colors duration-300 font-medium py-2 rounded-lg hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                Home
              </a>

              <a
                href="/overlay"
                className="block text-white/90 hover:text-yellow-400 transition-colors duration-300 font-medium py-2 rounded-lg hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                Editor
              </a>

              <a
                href="/ghibli"
                className="block text-white/90 hover:text-yellow-400 transition-colors duration-300 font-medium py-2 rounded-lg hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                Ghibli Art
              </a>

              <a
                href="https://portfolio-sachin-ruby.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/90 hover:text-yellow-400 transition-colors duration-300 font-medium py-2 rounded-lg hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                Contact
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="https://github.com/SachinPundir78/AniCraft"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-yellow-400/50 transition-all duration-300 mt-4"
                onClick={() => setIsOpen(false)}
              >
                <FaGithub className="w-4 h-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
