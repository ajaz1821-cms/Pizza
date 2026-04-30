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
import { addDoc, collection, serverTimestamp, getDocs } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './lib/firestore-errors';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Saharsa Firestore se live data
  useEffect(() => {
    const getMenu = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pizza"));
        const items = querySnapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        } as MenuItem));
        setMenuItems(items);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getMenu();

    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
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
    setCart(prev => prev.map(i => i.item.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i).filter(i => i.quantity > 0));
  };

  const handleCheckout = async () => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    const orderData: Order = {
      userId: user.uid,
      items: cart.map(({ item, quantity }) => ({ menuItemId: item.id, name: item.name, quantity, price: item.price })),
      status: OrderStatus.PENDING,
      total: cart.reduce((sum, { item, quantity }) => sum + item.price * quantity, 0) + 5,
      createdAt: serverTimestamp(),
      deliveryLocation: { address: 'Gandhi Path, Saharsa', lat: 25.8835, lng: 86.6006 }
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
    <div className="min-h-screen bg-white font-sans">
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
        <Menu items={menuItems} onAddToCart={addToCart} />
        <PizzaGallery />
        <ReviewSection />
        <ContactForm />
      </main>

      <footer className="bg-gray-900 py-6 text-center">
        <span className="text-white font-bold">PizzaHaven Saharsa © 2026</span>
      </footer>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} items={cart} onUpdateQuantity={updateQuantity} onCheckout={handleCheckout} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} user={user} />
      {user && <Orders isOpen={isOrdersOpen} onClose={() => setIsOrdersOpen(false)} userId={user.uid} />}
    </div>
  );
          }
  
