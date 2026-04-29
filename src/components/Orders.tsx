import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Package, Truck, CheckCircle2, Clock, MapPin, ChevronRight, Activity } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { collection, query, where, onSnapshot, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface OrdersProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

export default function Orders({ isOpen, onClose, userId }: OrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen || !userId) return;

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'orders');
    });

    return () => unsubscribe();
  }, [isOpen, userId]);

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return <Clock className="w-5 h-5 text-yellow-500" />;
      case OrderStatus.PREPARING: return <Package className="w-5 h-5 text-orange-500" />;
      case OrderStatus.OUT_FOR_DELIVERY: return <Truck className="w-5 h-5 text-blue-500" />;
      case OrderStatus.DELIVERED: return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    }
  };

  const getStatusStep = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING: return 1;
      case OrderStatus.PREPARING: return 2;
      case OrderStatus.OUT_FOR_DELIVERY: return 3;
      case OrderStatus.DELIVERED: return 4;
    }
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
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed top-0 left-0 bottom-0 w-full max-w-lg bg-white z-[90] shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold uppercase tracking-widest text-gray-900">Delivery Pulse</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                  <Package className="w-16 h-16 opacity-20" />
                  <p className="font-bold tracking-widest text-xs uppercase text-center">No orders yet. <br/> Your pizza journey starts here.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-gray-50 rounded-3xl p-6 border border-gray-100 relative overflow-hidden group">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1">Order ID</p>
                        <p className="text-xs font-mono font-bold text-gray-600">#{order.id?.slice(-8).toUpperCase()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-1 text-right">Total Paid</p>
                        <p className="text-sm font-black text-gray-900 font-serif italic">${order.total.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-orange-50 transition-colors">
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Live Status</p>
                          <p className="text-xs font-black uppercase text-gray-900">{order.status.replace('-', ' ')}</p>
                        </div>
                      </div>
                      {order.status !== OrderStatus.DELIVERED && (
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
                          <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Tracking Live</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(getStatusStep(order.status) / 4) * 100}%` }}
                        className="absolute h-full bg-orange-600 rounded-full shadow-[0_0_10px_rgba(234,88,12,0.4)]"
                      />
                    </div>

                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 bg-white border border-gray-100 flex items-center justify-center rounded text-[10px] font-bold text-gray-900">{item.quantity}x</span>
                            <span className="font-medium text-gray-600 uppercase tracking-tighter">{item.name}</span>
                          </div>
                          <span className="font-serif italic text-gray-400">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {order.deliveryLocation && (
                      <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3 text-gray-500">
                        <MapPin className="w-4 h-4 shrink-0 text-orange-400" />
                        <p className="text-[10px] font-medium uppercase truncate leading-snug">{order.deliveryLocation.address}</p>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
            
            <div className="p-6 bg-gray-50">
              <p className="text-[10px] text-center text-gray-400 uppercase tracking-[0.2em]">
                Fastest Delivery Guarantee in the City
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
