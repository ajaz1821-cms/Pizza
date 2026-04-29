import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
}

export default function AuthModal({ isOpen, onClose, user }: AuthModalProps) {
  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80]" 
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.1, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white z-[90] rounded-[2.5rem] shadow-2xl p-10 overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center">
              <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <UserIcon className="w-8 h-8" />
              </div>
              
              {user ? (
                <>
                  <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Welcome back,</h2>
                  <p className="text-xl font-serif italic text-orange-600 mb-8">{user.displayName}</p>
                  
                  <button 
                    onClick={logout}
                    className="w-full py-4 bg-gray-100 text-gray-900 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-gray-900 mb-2 uppercase tracking-tighter">Account</h2>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                    Join PizzaHaven to unlock order history, <br/> rapid delivery, and exclusive rewards.
                  </p>
                  
                  <button 
                    onClick={login}
                    className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-orange-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-orange-100"
                  >
                    <LogIn className="w-4 h-4" />
                    Continue with Google
                  </button>
                </>
              )}
              
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                  By continuing, you agree to our <br/> 
                  <span className="font-bold text-gray-500 underline cursor-pointer">Terms of Service</span> and <span className="font-bold text-gray-500 underline cursor-pointer">Privacy Policy</span>
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
