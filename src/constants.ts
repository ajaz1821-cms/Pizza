import { ItemCategory, MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Classic Margherita',
    description: 'Fresh basil, buffalo mozzarella, and our signature tomato sauce.',
    price: 14.99,
    category: ItemCategory.VEG,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm2',
    name: 'Pepperoni Perfection',
    description: 'Double portion of spicy pepperoni with melting mozzarella.',
    price: 16.99,
    category: ItemCategory.NON_VEG,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm3',
    name: 'Garden Harvest',
    description: 'Bell peppers, olives, mushrooms, and red onions.',
    price: 15.49,
    category: ItemCategory.VEG,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    name: 'GF Hawaiian',
    description: 'Ham, pineapple, and GF-certified crust.',
    price: 17.99,
    category: ItemCategory.GLUTEN_FREE,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm5',
    name: 'Spicy BBQ Chicken',
    description: 'Grilled chicken, BBQ sauce, and jalapeños.',
    price: 18.49,
    category: ItemCategory.NON_VEG,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm6',
    name: 'GF Veggie Supreme',
    description: 'Loaded with seasonal veggies on a crisp gluten-free base.',
    price: 16.99,
    category: ItemCategory.GLUTEN_FREE,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=800&q=80'
  }
];

export const SPECIAL_OFFERS = [
  {
    id: 'o1',
    title: 'Family Feast',
    description: 'Get any 2 large pizzas and a choice of sides for 20% off!',
    code: 'FAMILY20'
  },
  {
    id: 'o2',
    title: 'Lunch Express',
    description: 'Medium pizza + soft drink for only $12.99',
    code: 'LUNCH12'
  }
];
