// Products data with all sizes available
const products = [
  // Bucket Hats products
  {
    id: 1001,
    name: 'Bucket Hat 1',
    price: 19.99,
    image: '/images/bucket-hats/hat1.jpg',
    category: 'Bucket Hats',
    rating: 4.5,
    badge: 'New',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 1002,
    name: 'Bucket Hat 2',
    price: 21.99,
    image: '/images/bucket-hats/hat2.jpg',
    category: 'Bucket Hats',
    rating: 4.6,
    badge: 'Trending',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 1003,
    name: 'Bucket Hat 3',
    price: 18.99,
    image: '/images/bucket-hats/hat3.jpg',
    category: 'Bucket Hats',
    rating: 4.4,
    badge: 'Popular',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 1004,
    name: 'Bucket Hat 4',
    price: 22.99,
    image: '/images/bucket-hats/hat4.jpg',
    category: 'Bucket Hats',
    rating: 4.7,
    badge: 'Limited',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 1005,
    name: 'Bucket Hat 5',
    price: 20.99,
    image: '/images/bucket-hats/hat5.jpg',
    category: 'Bucket Hats',
    rating: 4.5,
    badge: 'New',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 1006,
    name: 'Bucket Hat 6',
    price: 19.49,
    image: '/images/bucket-hats/hat6.jpg',
    category: 'Bucket Hats',
    rating: 4.3,
    badge: 'Classic',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 1007,
    name: 'Bucket Hat 7',
    price: 23.99,
    image: '/images/bucket-hats/hat7.jpg',
    category: 'Bucket Hats',
    rating: 4.8,
    badge: 'Premium',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  // Camo Long Jackets products
  {
    id: 2001,
    name: 'Camo Long Jacket 1',
    price: 59.99,
    image: '/images/Camo Long Jackets/IMG-20250516-WA0004.jpg',
    category: 'Camo Long Jackets',
    rating: 4.5,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 2002,
    name: 'Camo Long Jacket 2',
    price: 64.99,
    image: '/images/Camo Long Jackets/IMG-20250605-WA0002.jpg',
    category: 'Camo Long Jackets',
    rating: 4.6,
    badge: 'Trending',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  // Caps products
  {
    id: 3001,
    name: 'Cap 1',
    price: 15.99,
    image: '/images/Caps/cap1 (1).jpg',
    category: 'Caps',
    rating: 4.2,
    badge: 'New',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3002,
    name: 'Cap 2',
    price: 16.49,
    image: '/images/Caps/cap1 (2).jpg',
    category: 'Caps',
    rating: 4.3,
    badge: 'Trending',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3003,
    name: 'Cap 3',
    price: 14.99,
    image: '/images/Caps/cap1 (3).jpg',
    category: 'Caps',
    rating: 4.1,
    badge: 'Popular',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3004,
    name: 'Cap 4',
    price: 17.99,
    image: '/images/Caps/cap1 (4).jpg',
    category: 'Caps',
    rating: 4.4,
    badge: 'Limited',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3005,
    name: 'Cap 5',
    price: 15.49,
    image: '/images/Caps/cap1 (5).jpg',
    category: 'Caps',
    rating: 4.2,
    badge: 'New',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3006,
    name: 'Cap 6',
    price: 16.99,
    image: '/images/Caps/cap1 (6).jpg',
    category: 'Caps',
    rating: 4.3,
    badge: 'Classic',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3007,
    name: 'Cap 7',
    price: 18.49,
    image: '/images/Caps/cap1 (7).jpg',
    category: 'Caps',
    rating: 4.5,
    badge: 'Premium',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3008,
    name: 'Cap 8',
    price: 15.99,
    image: '/images/Caps/cap1 (8).jpg',
    category: 'Caps',
    rating: 4.2,
    badge: 'New',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3009,
    name: 'Cap 9',
    price: 17.49,
    image: '/images/Caps/cap1 (9).jpg',
    category: 'Caps',
    rating: 4.4,
    badge: 'Popular',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  {
    id: 3010,
    name: 'Cap 10',
    price: 16.99,
    image: '/images/Caps/cap1 (10).jpg',
    category: 'Caps',
    rating: 4.3,
    badge: 'Trending',
    sizes: ['S/M', 'L/XL', 'One Size'],
    availableSizes: ['S/M', 'L/XL', 'One Size']
  },
  // Hoodies products
  {
    id: 4001,
    name: 'Hoodie 1',
    price: 39.99,
    image: '/images/Hoodies/IMG-20231113-WA0013.jpg',
    category: 'Hoodies',
    rating: 4.6,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 4002,
    name: 'Hoodie 2',
    price: 42.99,
    image: '/images/Hoodies/IMG-20231113-WA0014.jpg',
    category: 'Hoodies',
    rating: 4.7,
    badge: 'Popular',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  // Quilted puff jacket product
  {
    id: 5001,
    name: 'Quilted Puff Jacket',
    price: 89.99,
    image: '/images/Quilted puff jacket/signal-2022-05-15-14-37-20-389.jpg',
    category: 'Quilted puff jacket',
    rating: 4.8,
    badge: 'Premium',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  // Shorts products
  {
    id: 6001,
    name: 'Short 1',
    price: 24.99,
    image: '/images/Shorts/short1 (1).jpg',
    category: 'Shorts',
    rating: 4.2,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6002,
    name: 'Short 2',
    price: 25.99,
    image: '/images/Shorts/short1 (2).jpg',
    category: 'Shorts',
    rating: 4.3,
    badge: 'Trending',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6003,
    name: 'Short 3',
    price: 23.99,
    image: '/images/Shorts/short1 (3).jpg',
    category: 'Shorts',
    rating: 4.1,
    badge: 'Popular',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6004,
    name: 'Short 4',
    price: 26.99,
    image: '/images/Shorts/short1 (4).jpg',
    category: 'Shorts',
    rating: 4.4,
    badge: 'Limited',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6005,
    name: 'Short 5',
    price: 24.49,
    image: '/images/Shorts/short1 (5).jpg',
    category: 'Shorts',
    rating: 4.2,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6006,
    name: 'Short 6',
    price: 25.49,
    image: '/images/Shorts/short1 (6).jpg',
    category: 'Shorts',
    rating: 4.3,
    badge: 'Classic',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6007,
    name: 'Short 7',
    price: 27.99,
    image: '/images/Shorts/short1 (7).jpg',
    category: 'Shorts',
    rating: 4.5,
    badge: 'Premium',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6008,
    name: 'Short 8',
    price: 24.99,
    image: '/images/Shorts/short1 (8).jpg',
    category: 'Shorts',
    rating: 4.2,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6009,
    name: 'Short 9',
    price: 26.49,
    image: '/images/Shorts/short1 (9).jpg',
    category: 'Shorts',
    rating: 4.4,
    badge: 'Popular',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6010,
    name: 'Short 10',
    price: 25.99,
    image: '/images/Shorts/short1 (10).jpg',
    category: 'Shorts',
    rating: 4.3,
    badge: 'Trending',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6011,
    name: 'Short 11',
    price: 24.49,
    image: '/images/Shorts/short1 (11).jpg',
    category: 'Shorts',
    rating: 4.2,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6012,
    name: 'Short 12',
    price: 25.49,
    image: '/images/Shorts/short1 (12).jpg',
    category: 'Shorts',
    rating: 4.3,
    badge: 'Classic',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6013,
    name: 'Short 13',
    price: 27.99,
    image: '/images/Shorts/short1 (13).jpg',
    category: 'Shorts',
    rating: 4.5,
    badge: 'Premium',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6014,
    name: 'Short 14',
    price: 24.99,
    image: '/images/Shorts/short1 (14).jpg',
    category: 'Shorts',
    rating: 4.2,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6015,
    name: 'Short 15',
    price: 26.49,
    image: '/images/Shorts/short1 (15).jpg',
    category: 'Shorts',
    rating: 4.4,
    badge: 'Popular',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 6016,
    name: 'Short 16',
    price: 25.99,
    image: '/images/Shorts/short1 (16).jpg',
    category: 'Shorts',
    rating: 4.3,
    badge: 'Trending',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  // Sweaters products
  {
    id: 7001,
    name: 'Sweater 1',
    price: 34.99,
    image: '/images/Sweaters/s1 (1).jpg',
    category: 'Sweaters',
    rating: 4.5,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 7002,
    name: 'Sweater 2',
    price: 36.99,
    image: '/images/Sweaters/s1 (2).jpg',
    category: 'Sweaters',
    rating: 4.6,
    badge: 'Trending',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 7003,
    name: 'Sweater 3',
    price: 32.99,
    image: '/images/Sweaters/s1 (3).jpg',
    category: 'Sweaters',
    rating: 4.4,
    badge: 'Popular',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  // Tracksuits products
  {
    id: 8001,
    name: 'Tracksuit 1',
    price: 49.99,
    image: '/images/Tracksuits/t1 (1).jpg',
    category: 'Tracksuits',
    rating: 4.7,
    badge: 'New',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 8002,
    name: 'Tracksuit 2',
    price: 52.99,
    image: '/images/Tracksuits/t1 (2).jpg',
    category: 'Tracksuits',
    rating: 4.8,
    badge: 'Trending',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  }
];

export default products; 