export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  category: string;
  subcategory: string;
  seller: string;
  sellerId: string;
  stock: number;
  description: string;
  gradient: [string, string];
  tags: string[];
  isExpress: boolean;
  specifications: Record<string, string>;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  color2: string;
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
  isSeller: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  gradient: [string, string];
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';
  date: string;
  estimatedDelivery: string;
  paymentMethod: 'razorpay' | 'upi' | 'cod';
  address: Address;
}

export interface SellerProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  gradient: [string, string];
}

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', icon: 'phone-portrait-outline', color: '#3B82F6', color2: '#6366F1' },
  { id: '2', name: 'Clothing', slug: 'clothing', icon: 'shirt-outline', color: '#EC4899', color2: '#F43F5E' },
  { id: '3', name: 'Groceries', slug: 'groceries', icon: 'leaf-outline', color: '#22C55E', color2: '#16A34A' },
  { id: '4', name: 'Food', slug: 'food', icon: 'fast-food-outline', color: '#F97316', color2: '#EF4444' },
  { id: '5', name: 'Household', slug: 'household', icon: 'home-outline', color: '#14B8A6', color2: '#0891B2' },
  { id: '6', name: 'Beauty', slug: 'beauty', icon: 'sparkles-outline', color: '#A855F7', color2: '#EC4899' },
  { id: '7', name: 'Sports', slug: 'sports', icon: 'football-outline', color: '#F59E0B', color2: '#EF4444' },
  { id: '8', name: 'Books', slug: 'books', icon: 'book-outline', color: '#6366F1', color2: '#8B5CF6' },
];

export const PRODUCTS: Product[] = [
  // Electronics
  {
    id: 'e1',
    name: 'iPhone 15 Pro Max',
    price: 129900,
    originalPrice: 149900,
    discount: 13,
    rating: 4.8,
    reviewCount: 4821,
    category: 'electronics',
    subcategory: 'Smartphones',
    seller: 'Apple Authorized Store',
    sellerId: 's1',
    stock: 50,
    description: 'Apple iPhone 15 Pro Max with A17 Pro chip, titanium design, 48MP camera system, and Action button. The most powerful iPhone ever made.',
    gradient: ['#1E3A5F', '#3B82F6'],
    tags: ['apple', 'iphone', 'smartphone', '5g'],
    isExpress: true,
    specifications: { Display: '6.7" Super Retina XDR', Chip: 'A17 Pro', Camera: '48MP Main', Battery: '4422 mAh', Storage: '256GB', Color: 'Natural Titanium' },
  },
  {
    id: 'e2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 89999,
    originalPrice: 104999,
    discount: 14,
    rating: 4.7,
    reviewCount: 3256,
    category: 'electronics',
    subcategory: 'Smartphones',
    seller: 'Samsung Official',
    sellerId: 's2',
    stock: 80,
    description: 'Samsung Galaxy S24 Ultra with Galaxy AI, 200MP camera, S Pen, and Snapdragon 8 Gen 3. The ultimate Android powerhouse.',
    gradient: ['#1F2937', '#4F46E5'],
    tags: ['samsung', 'android', 'galaxy', 's-pen'],
    isExpress: true,
    specifications: { Display: '6.8" Dynamic AMOLED 2X', Chip: 'Snapdragon 8 Gen 3', Camera: '200MP Main', Battery: '5000 mAh', Storage: '256GB', Color: 'Titanium Black' },
  },
  {
    id: 'e3',
    name: 'Sony WH-1000XM5 Headphones',
    price: 24990,
    originalPrice: 34990,
    discount: 29,
    rating: 4.9,
    reviewCount: 8712,
    category: 'electronics',
    subcategory: 'Audio',
    seller: 'Sony India',
    sellerId: 's3',
    stock: 120,
    description: 'Industry-leading noise cancellation with new eight microphones and two processors. Up to 30 hours battery life.',
    gradient: ['#111827', '#374151'],
    tags: ['sony', 'headphones', 'noise-cancelling', 'wireless'],
    isExpress: false,
    specifications: { Type: 'Over-ear', Battery: '30 hours', Connection: 'Bluetooth 5.2', Microphones: '8 microphones', Weight: '250g', Color: 'Black' },
  },
  {
    id: 'e4',
    name: 'Apple MacBook Air M3',
    price: 114900,
    originalPrice: 124900,
    discount: 8,
    rating: 4.9,
    reviewCount: 2341,
    category: 'electronics',
    subcategory: 'Laptops',
    seller: 'Apple Authorized Store',
    sellerId: 's1',
    stock: 30,
    description: '15-inch MacBook Air with M3 chip. Impossibly thin design with up to 18 hours battery life and powerful performance.',
    gradient: ['#C0C0C0', '#6B7280'],
    tags: ['apple', 'macbook', 'laptop', 'm3'],
    isExpress: true,
    specifications: { Display: '15.3" Liquid Retina', Chip: 'Apple M3', RAM: '16GB', Storage: '512GB SSD', Battery: '18 hours', Color: 'Starlight' },
  },
  // Clothing
  {
    id: 'c1',
    name: 'Premium Linen Kurta Set',
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    rating: 4.5,
    reviewCount: 1892,
    category: 'clothing',
    subcategory: 'Ethnic Wear',
    seller: 'FabIndia Official',
    sellerId: 's4',
    stock: 200,
    description: 'Handwoven linen kurta with palazzo set. Perfect for festive occasions and casual outings. Available in multiple colors.',
    gradient: ['#D97706', '#F59E0B'],
    tags: ['kurta', 'ethnic', 'linen', 'festive'],
    isExpress: false,
    specifications: { Material: '100% Linen', Fit: 'Regular', Sizes: 'XS to XXL', Care: 'Machine Wash', Occasion: 'Festive/Casual', Origin: 'India' },
  },
  {
    id: 'c2',
    name: 'Classic Oxford Shirt',
    price: 999,
    originalPrice: 2499,
    discount: 60,
    rating: 4.3,
    reviewCount: 5621,
    category: 'clothing',
    subcategory: 'Formal Wear',
    seller: 'Arrow India',
    sellerId: 's5',
    stock: 350,
    description: 'Premium cotton Oxford shirt with button-down collar. Ideal for office and formal occasions. Wrinkle-resistant fabric.',
    gradient: ['#1D4ED8', '#3B82F6'],
    tags: ['shirt', 'formal', 'oxford', 'cotton'],
    isExpress: true,
    specifications: { Material: '100% Cotton', Fit: 'Slim Fit', Sizes: 'S to XXL', Care: 'Machine Wash', Occasion: 'Formal', Pattern: 'Solid' },
  },
  {
    id: 'c3',
    name: 'Anarkali Floral Dress',
    price: 1799,
    originalPrice: 3499,
    discount: 49,
    rating: 4.6,
    reviewCount: 2341,
    category: 'clothing',
    subcategory: 'Women\'s Ethnic',
    seller: 'W For Woman',
    sellerId: 's6',
    stock: 180,
    description: 'Elegant floral printed Anarkali dress with dupatta. Lightweight georgette fabric perfect for weddings and parties.',
    gradient: ['#BE185D', '#F43F5E'],
    tags: ['anarkali', 'ethnic', 'floral', 'georgette'],
    isExpress: false,
    specifications: { Material: 'Georgette', Fit: 'Flared', Sizes: 'XS to XL', Care: 'Dry Clean', Occasion: 'Wedding/Party', Set: 'With Dupatta' },
  },
  {
    id: 'c4',
    name: 'Slim Fit Stretch Jeans',
    price: 1299,
    originalPrice: 2499,
    discount: 48,
    rating: 4.4,
    reviewCount: 7834,
    category: 'clothing',
    subcategory: 'Jeans',
    seller: 'Levi\'s India',
    sellerId: 's7',
    stock: 400,
    description: 'Levi\'s 511 Slim Fit jeans with 4-way stretch. Comfortable all-day wear with modern tapered leg design.',
    gradient: ['#1E3A5F', '#2563EB'],
    tags: ['jeans', 'denim', 'levis', 'slim'],
    isExpress: true,
    specifications: { Material: '98% Cotton 2% Elastane', Fit: 'Slim', Sizes: '28 to 38', Care: 'Machine Wash', Rise: 'Mid Rise', Color: 'Dark Indigo' },
  },
  // Groceries
  {
    id: 'g1',
    name: 'Organic Basmati Rice 5kg',
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.7,
    reviewCount: 12456,
    category: 'groceries',
    subcategory: 'Rice & Grains',
    seller: 'India Gate',
    sellerId: 's8',
    stock: 500,
    description: 'Premium aged Basmati rice from the foothills of Himalayas. Long grain, aromatic, and fluffy when cooked. Certified organic.',
    gradient: ['#65A30D', '#22C55E'],
    tags: ['rice', 'basmati', 'organic', 'himalayan'],
    isExpress: true,
    specifications: { Weight: '5kg', Type: 'Long Grain Basmati', Origin: 'Punjab/Haryana', Aged: '2 Years', Certification: 'Organic India', Shelf: '24 months' },
  },
  {
    id: 'g2',
    name: 'Cold-Pressed Coconut Oil 1L',
    price: 279,
    originalPrice: 399,
    discount: 30,
    rating: 4.8,
    reviewCount: 8921,
    category: 'groceries',
    subcategory: 'Oils & Ghee',
    seller: 'KLF Nirmal',
    sellerId: 's9',
    stock: 300,
    description: 'Pure wood-pressed coconut oil. No chemicals, no preservatives. Rich in lauric acid with traditional extraction method.',
    gradient: ['#F5E642', '#D97706'],
    tags: ['coconut-oil', 'cold-pressed', 'organic', 'cooking'],
    isExpress: false,
    specifications: { Volume: '1 Litre', Type: 'Cold Pressed', Source: 'Kerala Coconuts', Processing: 'Wood Pressed', Preservatives: 'None', Shelf: '12 months' },
  },
  {
    id: 'g3',
    name: 'Premium Toor Dal 2kg',
    price: 219,
    originalPrice: 299,
    discount: 27,
    rating: 4.5,
    reviewCount: 5632,
    category: 'groceries',
    subcategory: 'Pulses & Lentils',
    seller: 'Tata Sampann',
    sellerId: 's10',
    stock: 600,
    description: 'Tata Sampann premium Toor Dal with natural oils intact. High protein content and rich flavor for the perfect dal tadka.',
    gradient: ['#F59E0B', '#D97706'],
    tags: ['toor-dal', 'dal', 'lentils', 'tata'],
    isExpress: true,
    specifications: { Weight: '2kg', Type: 'Toor Dal', Protein: '22g per 100g', Processing: 'Unpolished', Preservatives: 'None', Origin: 'Maharashtra' },
  },
  {
    id: 'g4',
    name: 'Raw Organic Honey 500g',
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.9,
    reviewCount: 4123,
    category: 'groceries',
    subcategory: 'Sweeteners',
    seller: 'Dabur Honey',
    sellerId: 's11',
    stock: 250,
    description: 'Raw, unprocessed honey from the Himalayan beehives. Packed with antioxidants, enzymes and minerals. No sugar added.',
    gradient: ['#F59E0B', '#EA580C'],
    tags: ['honey', 'organic', 'raw', 'himalayan'],
    isExpress: false,
    specifications: { Weight: '500g', Source: 'Himalayan Flowers', Processing: 'Raw Unfiltered', Preservatives: 'None', Shelf: '18 months', Certification: 'FSSAI' },
  },
  // Food
  {
    id: 'f1',
    name: 'Lay\'s Variety Party Pack',
    price: 199,
    originalPrice: 279,
    discount: 29,
    rating: 4.4,
    reviewCount: 15623,
    category: 'food',
    subcategory: 'Snacks',
    seller: 'PepsiCo India',
    sellerId: 's12',
    stock: 1000,
    description: 'Lay\'s potato chips variety pack with Classic Salted, American Style Cream & Onion, and Spanish Tomato. Perfect for parties.',
    gradient: ['#F59E0B', '#EF4444'],
    tags: ['chips', 'lays', 'snacks', 'party'],
    isExpress: true,
    specifications: { Contents: '3 Varieties', Weight: '390g Total', Flavors: 'Salted, Cream & Onion, Tomato', Shelf: '6 months', Type: 'Potato Chips', Veg: 'Yes' },
  },
  {
    id: 'f2',
    name: 'Nescafé Classic Coffee 200g',
    price: 449,
    originalPrice: 649,
    discount: 31,
    rating: 4.6,
    reviewCount: 22341,
    category: 'food',
    subcategory: 'Beverages',
    seller: 'Nestlé India',
    sellerId: 's13',
    stock: 800,
    description: 'Nescafé Classic instant coffee made from 100% pure coffee. Rich, dark flavor with smooth aroma. Perfect for any time of day.',
    gradient: ['#7C3F26', '#A16207'],
    tags: ['coffee', 'nescafe', 'instant', 'beverages'],
    isExpress: true,
    specifications: { Weight: '200g', Type: 'Instant Coffee', Caffeine: '65mg per cup', Origin: 'South India', Shelf: '24 months', Pack: 'Glass Jar' },
  },
  {
    id: 'f3',
    name: 'Maggi 2-Minute Noodles 12-Pack',
    price: 178,
    originalPrice: 264,
    discount: 33,
    rating: 4.7,
    reviewCount: 45123,
    category: 'food',
    subcategory: 'Instant Food',
    seller: 'Nestlé India',
    sellerId: 's13',
    stock: 2000,
    description: 'Maggi 2-Minute Noodles family pack. Made with real ingredients and Masala tastemaker. The beloved Indian snack.',
    gradient: ['#EF4444', '#F97316'],
    tags: ['maggi', 'noodles', 'instant', 'nestle'],
    isExpress: true,
    specifications: { Pack: '12 units x 70g', Flavor: 'Masala', Cooking: '2 Minutes', Veg: 'Yes', Shelf: '12 months', Origin: 'India' },
  },
  {
    id: 'f4',
    name: 'Bournville Dark Chocolate 80g',
    price: 99,
    originalPrice: 149,
    discount: 34,
    rating: 4.5,
    reviewCount: 8932,
    category: 'food',
    subcategory: 'Chocolates',
    seller: 'Mondelez India',
    sellerId: 's14',
    stock: 500,
    description: 'Cadbury Bournville 50% cocoa dark chocolate with rich roasted cocoa flavor. Premium dark chocolate for the discerning palate.',
    gradient: ['#3D1A0A', '#7C3F26'],
    tags: ['chocolate', 'dark-chocolate', 'bournville', 'cadbury'],
    isExpress: false,
    specifications: { Weight: '80g', Cocoa: '50%', Type: 'Dark Chocolate', Veg: 'Yes', Shelf: '12 months', Origin: 'India' },
  },
  // Household
  {
    id: 'h1',
    name: 'Prestige Pressure Cooker 3L',
    price: 1099,
    originalPrice: 1799,
    discount: 39,
    rating: 4.7,
    reviewCount: 18923,
    category: 'household',
    subcategory: 'Cookware',
    seller: 'TTK Prestige',
    sellerId: 's15',
    stock: 150,
    description: 'Prestige Svachh stainless steel pressure cooker with a deep lid. Anti-bulge base for even heat distribution. 5-year warranty.',
    gradient: ['#6B7280', '#374151'],
    tags: ['prestige', 'pressure-cooker', 'cookware', 'stainless'],
    isExpress: false,
    specifications: { Capacity: '3 Litres', Material: 'Stainless Steel', Warranty: '5 Years', Type: 'Induction Compatible', Weight: '1.5kg', Origin: 'India' },
  },
  {
    id: 'h2',
    name: 'Philips Air Fryer HD9252',
    price: 7999,
    originalPrice: 11995,
    discount: 33,
    rating: 4.6,
    reviewCount: 9821,
    category: 'household',
    subcategory: 'Kitchen Appliances',
    seller: 'Philips India',
    sellerId: 's16',
    stock: 80,
    description: 'Philips Rapid Air Technology air fryer. 4.1L capacity. Up to 90% less fat than deep frying. With recipe book included.',
    gradient: ['#DC2626', '#B91C1C'],
    tags: ['philips', 'air-fryer', 'kitchen', 'healthy'],
    isExpress: true,
    specifications: { Capacity: '4.1 Litres', Power: '1400W', Temperature: '80-200°C', Warranty: '2 Years', Timer: '60 minutes', Weight: '3.5kg' },
  },
  {
    id: 'h3',
    name: 'Cotton Bath Towel Set of 2',
    price: 699,
    originalPrice: 1299,
    discount: 46,
    rating: 4.5,
    reviewCount: 6423,
    category: 'household',
    subcategory: 'Bath Linen',
    seller: 'Trident Group',
    sellerId: 's17',
    stock: 300,
    description: 'Premium 500 GSM cotton bath towels. Super absorbent and ultra-soft. Machine washable. Color-fast fabric. Set of 2.',
    gradient: ['#0891B2', '#0E7490'],
    tags: ['towel', 'bath', 'cotton', '500gsm'],
    isExpress: false,
    specifications: { GSM: '500', Material: '100% Cotton', Size: '70x150cm', Pack: 'Set of 2', Colors: 'Mixed', Care: 'Machine Wash' },
  },
  {
    id: 'h4',
    name: 'Dyson V12 Cordless Vacuum',
    price: 34900,
    originalPrice: 44900,
    discount: 22,
    rating: 4.8,
    reviewCount: 3421,
    category: 'household',
    subcategory: 'Cleaning',
    seller: 'Dyson India',
    sellerId: 's18',
    stock: 40,
    description: 'Dyson V12 Detect Slim laser-revealed dust technology. Up to 60 minutes run time. Includes 7 attachments for whole-home deep clean.',
    gradient: ['#7C3AED', '#6D28D9'],
    tags: ['dyson', 'vacuum', 'cordless', 'cleaning'],
    isExpress: true,
    specifications: { Runtime: '60 minutes', Suction: '150 AW', Technology: 'Laser Detect', Weight: '2.2kg', Warranty: '2 Years', Attachments: '7' },
  },
  // Beauty
  {
    id: 'b1',
    name: 'Mamaearth Vitamin C Serum',
    price: 499,
    originalPrice: 799,
    discount: 38,
    rating: 4.4,
    reviewCount: 24512,
    category: 'beauty',
    subcategory: 'Serums',
    seller: 'Mamaearth',
    sellerId: 's19',
    stock: 400,
    description: '10% Vitamin C serum with Turmeric for skin brightening. Fades dark spots. Dermatologically tested. No harmful chemicals.',
    gradient: ['#F59E0B', '#FB923C'],
    tags: ['serum', 'vitamin-c', 'mamaearth', 'brightening'],
    isExpress: true,
    specifications: { Volume: '30ml', Key: 'Vitamin C + Turmeric', Skin: 'All Skin Types', Tested: 'Dermatologically', Free: 'Paraben & SLS Free', Shelf: '18 months' },
  },
  {
    id: 'b2',
    name: 'Forest Essentials Face Wash',
    price: 875,
    originalPrice: 1175,
    discount: 26,
    rating: 4.6,
    reviewCount: 4321,
    category: 'beauty',
    subcategory: 'Face Care',
    seller: 'Forest Essentials',
    sellerId: 's20',
    stock: 200,
    description: 'Kashmiri Saffron & Neem Facial Cleanser. Ayurvedic formulation with 100% natural ingredients. Gentle daily cleanser.',
    gradient: ['#A855F7', '#7C3AED'],
    tags: ['face-wash', 'ayurvedic', 'forest-essentials', 'natural'],
    isExpress: false,
    specifications: { Volume: '150ml', Key: 'Saffron + Neem', Skin: 'All Types', Ingredients: '100% Natural', Type: 'Gel Cleanser', Origin: 'Himalayas' },
  },
  {
    id: 'b3',
    name: 'Minimalist 10% Niacinamide',
    price: 599,
    originalPrice: 849,
    discount: 29,
    rating: 4.7,
    reviewCount: 31245,
    category: 'beauty',
    subcategory: 'Serums',
    seller: 'Minimalist India',
    sellerId: 's21',
    stock: 500,
    description: 'High strength 10% Niacinamide + 1% Zinc formula. Reduces pore appearance, controls oil and reduces blemishes.',
    gradient: ['#E879F9', '#A855F7'],
    tags: ['niacinamide', 'minimalist', 'serum', 'pore-control'],
    isExpress: true,
    specifications: { Volume: '30ml', Key: '10% Niacinamide + 1% Zinc', Skin: 'Oily/Combination', Tested: 'Clinically Tested', Free: 'Fragrance Free', Shelf: '24 months' },
  },
  {
    id: 'b4',
    name: 'Dot & Key Watermelon Cream',
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.5,
    reviewCount: 8923,
    category: 'beauty',
    subcategory: 'Moisturizers',
    seller: 'Dot & Key',
    sellerId: 's22',
    stock: 350,
    description: 'Watermelon Sleeping Mask with Hyaluronic Acid. Deep hydration overnight formula. Wake up to plump, glowing skin.',
    gradient: ['#FB7185', '#EC4899'],
    tags: ['moisturizer', 'dot-key', 'watermelon', 'hydration'],
    isExpress: false,
    specifications: { Volume: '85g', Key: 'Watermelon + Hyaluronic Acid', Skin: 'Dry/Normal', Type: 'Sleeping Mask', Use: 'Nighttime', Shelf: '18 months' },
  },
];

export const SELLER_PRODUCTS: SellerProduct[] = [
  { id: 'sp1', name: 'iPhone 15 Pro Max', price: 129900, stock: 50, sales: 128, gradient: ['#1E3A5F', '#3B82F6'] },
  { id: 'sp2', name: 'MacBook Air M3', price: 114900, stock: 30, sales: 89, gradient: ['#C0C0C0', '#6B7280'] },
  { id: 'sp3', name: 'Sony WH-1000XM5', price: 24990, stock: 120, sales: 342, gradient: ['#111827', '#374151'] },
  { id: 'sp4', name: 'Apple iPad Air', price: 64900, stock: 45, sales: 67, gradient: ['#3B82F6', '#0EA5E9'] },
];

export const BANNERS = [
  { id: 'b1', image: require('../assets/images/banner-electronics.jpg'), title: 'Electronics Mega Sale', subtitle: 'Up to 40% Off', color: '#1E3A5F' },
  { id: 'b2', image: require('../assets/images/banner-fashion.jpg'), title: 'Fashion Week', subtitle: 'New Arrivals', color: '#BE185D' },
  { id: 'b3', image: require('../assets/images/banner-grocery.jpg'), title: 'Fresh Grocery Deals', subtitle: 'Daily Savings', color: '#065F46' },
];

export const COUPONS: Record<string, number> = {
  GRIPER10: 10,
  FIRST20: 20,
  SAVE15: 15,
  NEWUSER: 25,
};

export const formatPrice = (price: number): string => {
  return '₹' + price.toLocaleString('en-IN');
};
