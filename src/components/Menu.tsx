import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, ItemCategory } from '../types';
import { MENU_ITEMS } from '../constants';
import { Plus, Leaf, Flame, ShieldCheck } from 'lucide-react';

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [activeCategory, setActiveCategory] = useState<ItemCategory | 'all'>('all');

  const categories = [
    { id: 'all', label: 'All Pizzas', icon: null },
    { id: ItemCategory.VEG, label: 'Veg', icon: <Leaf className="w-4 h-4 text-green-500" /> },
    { id: ItemCategory.NON_VEG, label: 'Non-Veg', icon: <Flame className="w-4 h-4 text-red-500" /> },
    { id: ItemCategory.GLUTEN_FREE, label: 'Gluten-Free', icon: <ShieldCheck className="w-4 h-4 text-orange-500" /> },
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.4em] text-orange-600 font-bold mb-4">The Selection</h2>
          <h3 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">CHOOSE YOUR <br/> <span className="text-orange-500 italic font-serif">SIGNATURE</span> PIZZA</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                activeCategory === cat.id 
                ? 'bg-orange-600 text-white shadow-lg shadow-orange-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] mb-6">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter backdrop-blur-md border ${
                      item.category === ItemCategory.VEG ? 'bg-green-500/20 text-green-500 border-green-500/30' :
                      item.category === ItemCategory.NON_VEG ? 'bg-red-500/20 text-red-500 border-red-500/30' :
                      'bg-orange-500/20 text-orange-500 border-orange-500/30'
                    }`}>
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="absolute bottom-6 right-6 bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-orange-600 hover:text-white transition-all transform active:scale-90"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.name}</h4>
                    <span className="text-xl font-black text-gray-900 italic font-serif">${item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
