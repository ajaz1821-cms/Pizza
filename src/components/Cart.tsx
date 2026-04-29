import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag, CreditCard } from 'lucide-react';
import { MenuItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: { item: MenuItem; quantity: number }[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export default function Cart({ isOpen, onClose, items, onUpdateQuantity, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);
  const deliveryFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" 
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold uppercase tracking-widest">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="font-bold tracking-widest text-xs uppercase">Your cart is empty</p>
                </div>
              ) : (
                items.map(({ item, quantity }) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <h4 className="font-bold text-gray-900">{item.name}</h4>
                        <span className="font-bold font-serif italic">${(item.price * quantity).toFixed(2)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-1">
                          <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:text-orange-600 transition-colors">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{quantity}</span>
                          <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:text-orange-600 transition-colors">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -quantity)}
                          className="text-[10px] uppercase font-bold text-gray-400 hover:text-red-500 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 bg-gray-50 space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-4 mt-2">
                  <span>Total</span>
                  <span className="italic font-serif">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-100"
              >
                <CreditCard className="w-5 h-5" />
                Checkout & Pay
              </button>
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest">
                Secure SSL Encrypted Payment
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
