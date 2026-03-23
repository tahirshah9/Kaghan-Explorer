import { Destination, Hotel, TourPackage } from "./types";

export const DESTINATIONS: Destination[] = [
  {
    id: 'naran',
    name: 'Naran',
    description: 'The main hub of Kaghan Valley, famous for its vibrant markets and base for Saiful Muluk.',
    photo: 'https://images.unsplash.com/photo-1627662236973-4f80bd68a6c7?auto=format&fit=crop&w=800&q=80',
    bestTime: 'May - September',
    distance: '0 km (Main City)',
    difficulty: 'Easy',
    category: 'Towns'
  },
  {
    id: 'saiful-muluk',
    name: 'Saiful Muluk Lake',
    description: 'A legendary lake surrounded by snow-capped peaks, known for the fairy tale of Prince Saiful Muluk.',
    photo: 'https://images.unsplash.com/photo-1581403503643-4355938f361a?auto=format&fit=crop&w=800&q=80',
    bestTime: 'June - August',
    distance: '9 km from Naran',
    difficulty: 'Moderate',
    category: 'Lakes'
  },
  {
    id: 'babusar-top',
    name: 'Babusar Top',
    description: 'The highest point in Kaghan Valley, offering panoramic views of the Himalayas and Karakoram.',
    photo: 'https://images.unsplash.com/photo-1624008915317-cb3ad69b16ad?auto=format&fit=crop&w=800&q=80',
    bestTime: 'July - September',
    distance: '70 km from Naran',
    difficulty: 'Easy',
    category: 'Mountains'
  },
  {
    id: 'shogran',
    name: 'Shogran',
    description: 'A lush green plateau with stunning views of Siri Paye and Makra Peak.',
    photo: 'https://images.unsplash.com/photo-1622312675544-77353907725a?auto=format&fit=crop&w=800&q=80',
    bestTime: 'May - October',
    distance: '30 km from Balakot',
    difficulty: 'Easy',
    category: 'Meadows'
  }
];

export const HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Pine Park Hotel',
    location: 'Shogran',
    price: 15000,
    rating: 4.5,
    photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'],
    amenities: ['WiFi', 'Parking', 'Restaurant', 'Garden']
  },
  {
    id: '2',
    name: 'Arcadian Sprucewoods',
    location: 'Shogran',
    price: 22000,
    rating: 4.8,
    photos: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'],
    amenities: ['Luxury Rooms', 'Heating', 'Fine Dining', 'View']
  }
];

export const PACKAGES: TourPackage[] = [
  {
    id: '3-day',
    title: '3-Day Naran Escape',
    duration: '3 Days / 2 Nights',
    price: 45000,
    itinerary: ['Day 1: Arrival in Naran', 'Day 2: Saiful Muluk & Babusar Top', 'Day 3: Departure'],
    includes: ['Transport', 'Hotel', 'Breakfast'],
    excludes: ['Lunch', 'Dinner', 'Tickets'],
    groupSize: '2-4 People',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80'
  }
];
