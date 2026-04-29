import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1920&q=80" 
          alt="Hero Pizza" 
          className="w-full h-full object-cover brightness-[0.4]"
          referrerPolicy="no-referrer"
        />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6 uppercase tracking-[0.3em] text-orange-400 font-semibold text-xs transition-transform hover:scale-105 cursor-default">
            <Star className="w-4 h-4 fill-current" />
            <span>Best in the city</span>
            <Star className="w-4 h-4 fill-current" />
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tighter">
            THE ART OF <br/> 
            <span className="text-orange-500 italic font-serif">PERFECT</span> PIZZA
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Sourdough naturally leavened for 48 hours, stone-baked at 400°C. 
            The authentic taste of Italy delivered to your doorstep.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto px-8 py-4 bg-orange-600 text-white font-bold rounded-full hover:bg-orange-700 transition-all flex items-center justify-center gap-2 group"
            >
              Order Online
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full md:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full backdrop-blur-sm transition-all border border-white/20"
            >
              Special Offers
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-12 hidden lg:block animate-bounce">
        <div className="writing-mode-vertical text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
          Scroll to explore
        </div>
      </div>
    </section>
  );
}
