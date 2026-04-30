import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function Admin() {
  const [pizzas, setPizzas] = useState<any[]>([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      const querySnapshot = await getDocs(collection(db, "pizzas"));
      setPizzas(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPizzas();
  }, []);

  const updatePrice = async (id: string, newPrice: number) => {
    const pizzaDoc = doc(db, "pizzas", id);
    await updateDoc(pizzaDoc, { price: newPrice });
    alert("Saharsa Branch: Price Updated Successfully!");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-600">Pizza Heaven Admin</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {pizzas.map(pizza => (
          <div key={pizza.id} className="flex justify-between items-center border-b py-4">
            <span className="font-medium text-lg">{pizza.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">₹</span>
              <input 
                type="number" 
                defaultValue={pizza.price} 
                className="border rounded px-2 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-red-500"
                onBlur={(e) => updatePrice(pizza.id, Number(e.target.value))}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
    }
                  
