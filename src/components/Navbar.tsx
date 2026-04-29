import React from 'react';
import { ShoppingCart, User, Pizza, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenOrders: () => void;
  userName?: string | null;
}

export default function Navbar({ cartCount, onOpenCart, onOpenAuth, onOpenOrders, userName }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Pizza className="text-orange-600 w-8 h-8" />
          <span className="text-2xl font-bold font-sans tracking-tight text-gray-900">PizzaHaven</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 uppercase tracking-widest">
          <button onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-600 transition-colors">Menu</button>
          <button onClick={() => document.getElementById('offers')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-600 transition-colors">Offers</button>
          <button onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-600 transition-colors">Reviews</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange-600 transition-colors">Contact</button>
        </div>

        <div className="flex items-center gap-4">
          {userName && (
            <button 
              onClick={onOpenOrders}
              className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
            >
              <MapPin className="w-5 h-5 text-gray-700" />
            </button>
          )}
          <button 
            onClick={onOpenCart}
            className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="text-xs font-semibold">{userName ? userName.split(' ')[0] : 'Sign In'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
