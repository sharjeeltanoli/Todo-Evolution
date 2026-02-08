import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-16 border-t border-white/5 bg-[#000000] text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center space-y-12">
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-20 grayscale invert">
  
        </div>
        
        <div className="flex items-center gap-6">
          <Link 
            href="https://www.linkedin.com/in/muhammad-sharjeel-10591b254/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
          >
            <Linkedin size={24} />
          </Link>
          <Link 
            href="https://github.com/sharjeeltanoli/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
          >
            <Github size={24} />
          </Link>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">
            Made with passion for productivity
          </p>
          <p className="text-[9px] font-bold text-gray-600 uppercase tracking-[0.2em]">
            © 2026 Todo Evolution • created by Muhammad Sharjeel
          </p>
        </div>
      </div>
    </footer>
  );
}
