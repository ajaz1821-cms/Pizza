import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Cart from './components/Cart';
import AuthModal from './components/Auth';
import Orders from './components/Orders';
import ReviewSection from './components/ReviewSection';
import ContactForm from './components/ContactForm';
import PizzaGallery from './components/PizzaGallery';
import SpecialOffers from './components/SpecialOffers';
import { MenuItem, Order, OrderStatus } from './types';
import { auth, db } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './lib/firestore-errors';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(i => {
        if (i.item.id === id) {
          const nextQty = Math.max(0, i.quantity + delta);
          return { ...i, quantity: nextQty };
        }
        return i;
      }).filter(i => i.quantity > 0);
    });
  };

  const handleCheckout = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    const subtotal = cart.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);
    const total = subtotal + 5.00;

    const orderData: Order = {
      userId: user.uid,
      items: cart.map(({ item, quantity }) => ({
        menuItemId: item.id,
        name: item.name,
        quantity,
        price: item.price
      })),
      status: OrderStatus.PENDING,
      total,
      createdAt: serverTimestamp(),
      deliveryLocation: {
        address: '123 Main St, Pizza Town, PI 55555', // Mock address for now
        lat: 40.7128,
        lng: -74.0060
      }
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
      setCart([]);
      setIsCartOpen(false);
      setIsOrdersOpen(true);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'orders');
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-orange-100 selection:text-orange-600 font-sans">
      <Navbar 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        userName={user?.displayName}
      />
      
      <main>
        <Hero />
        <SpecialOffers />
        <Menu onAddToCart={addToCart} />
        <PizzaGallery />
        <ReviewSection />
        <ContactForm />
      </main>

      <footer className="bg-gray-900 py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="text-white text-xl font-black uppercase tracking-tighter">PizzaHaven</span>
            <span className="text-gray-500 text-[10px] uppercase font-bold tracking-widest ml-4">© 2026 Genuine Sourdough</span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-gray-500">
            <a href="#" className="hover:text-orange-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-orange-500 transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
      />

      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
      />

      {user && (
        <Orders 
          isOpen={isOrdersOpen}
          onClose={() => setIsOrdersOpen(false)}
          userId={user.uid}
        />
      )}
    </div>
  );
}
