export interface Product {
  id: string;
  name: string;
  brand: string;
  brandLogo?: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  isNew?: boolean;
  isLuxury?: boolean;
  isFavorite?: boolean;
  madeIn?: string;
  tags?: string[];
  colors?: { name: string; image: string }[];
  sizes?: string[];
  description?: string;
  details?: {
    dimensions?: string;
    packContents?: string;
    colour?: string;
    aestheticStyle?: string;
    careInstructions?: string;
    material?: string;
    pattern?: string;
    threadCount?: string;
  };
  rating?: number;
  reviewCount?: number;
}

export interface InspirationPost {
  id: string;
  image: string;
  title: string;
  description?: string;
  author: {
    name: string;
    avatar: string;
    isVerified?: boolean;
  };
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
  products?: Product[];
}

const productImages = {
  rug1: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=400&h=400&fit=crop',
  rug2: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=400&h=400&fit=crop',
  rug3: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
  cushion1: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop',
  cushion2: 'https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?w=400&h=400&fit=crop',
  vase1: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop',
  vase2: 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=400&h=400&fit=crop',
  lamp1: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop',
  basket1: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop',
  basket2: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=400&h=400&fit=crop',
  decor1: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop',
  decor2: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
  tableDecor: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=400&fit=crop',
  bedding1: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop',
  mirror1: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop',
};

const inspirationImages = {
  diningRoom: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=800&fit=crop',
  livingRoom: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&h=800&fit=crop',
  bedroom: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=800&fit=crop',
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop',
  tablescape: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=600&h=800&fit=crop',
  bohoCorner: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=800&fit=crop',
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Cascade - Ebony Slate/ Natural white',
    brand: 'Jaipur Rugs',
    brandLogo: 'JR',
    price: 2899,
    image: productImages.rug1,
    images: [productImages.rug1, productImages.rug2, productImages.rug3, productImages.decor1],
    isNew: true,
    isLuxury: true,
    madeIn: 'India',
    tags: ['Eco-friendly'],
    colors: [
      { name: 'Ebony Slate/ Natural white', image: productImages.rug1 },
      { name: 'Charcoal Grey', image: productImages.rug2 },
      { name: 'Natural Beige', image: productImages.rug3 },
    ],
    sizes: ['5x8 ft', '12x15 ft', '12x18 ft', '4 round ft', '4 runner ft'],
    description: 'Double-sided tape for wall mounting is included.',
    details: {
      dimensions: 'Bed sheet: 2.74m x 2.74m | 108x108"',
      packContents: '1 x Double Bedsheet\n2 x Pillow Covers',
      colour: 'Black and white',
      aestheticStyle: 'Boho',
      material: 'Wool',
      pattern: 'Zigzag',
      threadCount: '400 KPSI',
    },
    rating: 4.5,
    reviewCount: 128,
  },
  { id: '2', name: 'Handwoven Jute Basket Set', brand: 'Nicobar', price: 1299, originalPrice: 1599, image: productImages.basket1, images: [productImages.basket1, productImages.basket2], tags: ['Handmade'], madeIn: 'India' },
  { id: '3', name: 'Ceramic Table Vase - Terracotta', brand: 'AA Living', price: 849, image: productImages.vase1, images: [productImages.vase1, productImages.vase2], isNew: true, madeIn: 'India' },
  { id: '4', name: 'Block Print Cushion Cover', brand: 'Saphed', price: 599, image: productImages.cushion1, images: [productImages.cushion1, productImages.cushion2], tags: ['Handmade'], madeIn: 'India' },
  { id: '5', name: 'Brass Table Lamp - Antique', brand: 'Akanksha', price: 3499, originalPrice: 4299, image: productImages.lamp1, isLuxury: true, madeIn: 'India' },
  { id: '6', name: 'Hand-painted Wall Mirror', brand: 'Alto Company', price: 2199, image: productImages.mirror1, isNew: true, madeIn: 'India' },
  { id: '7', name: 'Organic Cotton Bedsheet Set', brand: 'Saphed', price: 1899, image: productImages.bedding1, tags: ['Eco-friendly'], madeIn: 'India' },
  { id: '8', name: 'Decorative Storage Basket', brand: 'Nicobar', price: 749, image: productImages.basket2, madeIn: 'India' },
  { id: '9', name: 'Printed Throw Pillow Set', brand: 'Good Earth', price: 1499, image: productImages.cushion2, isLuxury: true, madeIn: 'India' },
  { id: '10', name: 'Ceramic Planter - Blue', brand: 'Studio Pottery', price: 649, image: productImages.vase2, madeIn: 'India' },
  { id: '11', name: 'Macrame Wall Hanging', brand: 'Knotty Tales', price: 1299, image: productImages.decor1, tags: ['Handmade'], madeIn: 'India' },
  { id: '12', name: 'Wooden Serving Tray', brand: 'Ellementry', price: 899, image: productImages.tableDecor, madeIn: 'India' },
];

export const inspirationPosts: InspirationPost[] = [
  { id: '1', image: inspirationImages.tablescape, title: 'Festive tablescape inspiration', description: 'Create a warm dining experience', author: { name: 'Saphed', avatar: 'S', isVerified: true }, likes: 234, products: [products[0], products[3]] },
  { id: '2', image: inspirationImages.livingRoom, title: 'Cozy living room corner', description: 'Transform your space with textures', author: { name: 'Nicobar', avatar: 'N', isVerified: true }, likes: 189, products: [products[1], products[4]] },
  { id: '3', image: inspirationImages.bohoCorner, title: 'Boho bedroom styling', description: 'Mix patterns for eclectic look', author: { name: 'Good Earth', avatar: 'G', isVerified: true }, likes: 312, products: [products[6], products[10]] },
  { id: '4', image: inspirationImages.diningRoom, title: 'Minimal dining setup', description: 'Elegant dining essentials', author: { name: 'AA Living', avatar: 'A' }, likes: 156, products: [products[2], products[11]] },
  { id: '5', image: inspirationImages.bedroom, title: 'Serene bedroom retreat', description: 'Soft linens and muted tones', author: { name: 'Jaipur Rugs', avatar: 'JR', isVerified: true }, likes: 278, products: [products[0], products[6]] },
];

export const categories = [
  { id: 'rugs', name: 'Rugs', icon: 'grid' },
  { id: 'cushions', name: 'Cushions', icon: 'square' },
  { id: 'decor', name: 'Decor', icon: 'flower' },
  { id: 'lighting', name: 'Lighting', icon: 'lamp' },
  { id: 'storage', name: 'Storage', icon: 'box' },
  { id: 'bedding', name: 'Bedding', icon: 'bed' },
];

export const brands = [
  { id: 'saphed', name: 'Saphed', description: 'A home and living brand', logo: 'S' },
  { id: 'nicobar', name: 'Nicobar', description: 'Accessories for comfortable home', logo: 'N' },
  { id: 'jaipur-rugs', name: 'Jaipur Rugs', description: 'Artisan crafted rugs', logo: 'JR' },
  { id: 'good-earth', name: 'Good Earth', description: 'Luxury home decor', logo: 'G' },
  { id: 'aa-living', name: 'AA Living', description: 'Contemporary home essentials', logo: 'A' },
];

export const filters = ['All', 'Rugs', 'Cushions', 'Decor', 'Lighting', 'Storage'];
