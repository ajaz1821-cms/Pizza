import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Star, UserCircle, ArrowRight } from 'lucide-react';
import { Review } from '../types';

export default function ReviewSection() {
  const [reviews] = useState<Review[]>([
    {
      userId: '1',
      userName: 'Marco Rossi',
      rating: 5,
      comment: "The crust is incredible. Reminds me exactly of the pizza I had in Naples. Best sourdough in town!",
      createdAt: new Date().toISOString()
    },
    {
      userId: '2',
      userName: 'Sarah Jenkins',
      rating: 5,
      comment: "I'm gluten-intolerant and it's so hard to find good GF pizza. PizzaHaven is a game changer. Tastes like real pizza!",
      createdAt: new Date().toISOString()
    },
    {
      userId: '3',
      userName: 'David Chen',
      rating: 4,
      comment: "Super fast delivery and huge toppings. The Spicy BBQ chicken is my new favorite weekend treat.",
      createdAt: new Date().toISOString()
    }
  ]);

  return (
    <section id="reviews" className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-sm uppercase tracking-[0.4em] text-orange-600 font-bold mb-4">Guest Book</h2>
            <h3 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-8">PEOPLE <span className="text-orange-500 italic font-serif">LOVE</span> OUR DOUGH</h3>
            <p className="text-gray-500 text-lg mb-12 leading-relaxed max-w-md">
              Don't just take our word for it. Join thousands of happy pizza lovers across the city.
            </p>
            <div className="flex gap-4">
              <div className="text-3xl font-black text-gray-900 border-r border-gray-200 pr-6 mr-6">
                4.9<span className="text-sm text-gray-400 font-medium">/5</span>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-1 text-orange-500 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Based on 2.4k reviews</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {reviews.map((review, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                    <UserCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.userName}</h4>
                    <div className="flex gap-1 text-orange-500">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
