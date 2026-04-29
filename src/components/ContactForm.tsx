import React from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export default function ContactForm() {
  return (
    <section id="contact" className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-600/10 skew-x-12 translate-x-1/2" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-sm uppercase tracking-[0.4em] text-orange-500 font-bold mb-4 text-center lg:text-left">Get in Touch</h2>
              <h3 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8 text-center lg:text-left">WANT TO <br/> <span className="text-orange-500 italic font-serif">SAY CIAO?</span></h3>
              
              <div className="space-y-8 mt-12">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Our Flagship</p>
                    <p className="text-white font-medium">123 Sourdough Lane, Pizza District</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Direct Line</p>
                    <p className="text-white font-medium">+1 (555) PIZZA-H8</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-500 tracking-widest mb-1">Inquiries</p>
                    <p className="text-white font-medium">ciao@pizzahaven.com</p>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-6 bg-white/5 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl border border-white/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-2">Name</label>
                  <input type="text" className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="John Wick" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-2">Email</label>
                  <input type="email" className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors" placeholder="john@continental.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-2">Message</label>
                <textarea className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-orange-500 transition-colors h-32 resize-none" placeholder="How can we help?" />
              </div>
              <button className="w-full py-4 bg-orange-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-orange-700 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-orange-950">
                Send Inquiry
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
