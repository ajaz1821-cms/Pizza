import React from 'react';
import { motion } from 'motion/react';
import { Camera, Instagram } from 'lucide-react';

const IMAGES = [
  'https://images.unsplash.com/photo-1593504049359-74330189a355?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1574129810360-704a21ccd12f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80'
];

export default function PizzaGallery() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row items-end justify-between gap-8">
        <div>
          <h2 className="text-sm uppercase tracking-[0.4em] text-orange-600 font-bold mb-4">The Gallery</h2>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">VISUAL <span className="text-orange-500 italic font-serif">CRUST</span> STORIES</h3>
        </div>
        <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors border-b-2 border-gray-100 pb-2">
          <Instagram className="w-4 h-4" />
          Follow @pizzahaven
        </button>
      </div>

      <div className="flex gap-4 overflow-hidden -mx-4 group">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex gap-4 px-4 whitespace-nowrap min-w-full"
        >
          {[...IMAGES, ...IMAGES].map((img, idx) => (
            <div key={idx} className="w-[300px] md:w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden shrink-0 relative group/item">
              <img src={img} alt="Pizza" className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity backdrop-blur-sm">
                <Camera className="text-white w-10 h-10" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
