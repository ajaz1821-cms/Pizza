import React from 'react';
import { motion } from 'motion/react';
import { SPECIAL_OFFERS } from '../constants';
import { Tag, Zap } from 'lucide-react';

export default function SpecialOffers() {
  return (
    <section id="offers" className="py-24 bg-orange-600 px-6 relative overflow-hidden">
      {/* Decorative pizza silhouettes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.4em] text-white/60 font-bold mb-4">Limited Time</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white leading-tight">HOT <span className="text-gray-900 italic font-serif">OFFERS</span> & DEALS</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {SPECIAL_OFFERS.map((offer, idx) => (
            <motion.div 
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-white rounded-[3rem] p-10 md:p-14 relative overflow-hidden group hover:scale-[1.02] transition-all"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 animate-pulse">
                  <Zap className="w-8 h-8 fill-current" />
                </div>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <Tag className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-orange-600">Promo: {offer.code}</span>
                </div>
                
                <h4 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{offer.title}</h4>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed">{offer.description}</p>
                
                <button className="px-10 py-4 bg-gray-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-gray-200">
                  Claim this Deal
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
