import { Hotel } from "../types";
import { Star, MapPin, Wifi, Car, Coffee, Trees } from "lucide-react";
import { motion } from "motion/react";

export default function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-100 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={hotel.photos[0]}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
          <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
          <span>{hotel.rating}</span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-emerald-950">{hotel.name}</h3>
            <div className="flex items-center space-x-1 text-emerald-800/60 text-sm">
              <MapPin className="h-3 w-3" />
              <span>{hotel.location}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-emerald-950">Rs. {hotel.price.toLocaleString()}</span>
            <p className="text-xs text-emerald-800/50">per night</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-emerald-50">
          {hotel.amenities.map((amenity) => (
            <span key={amenity} className="flex items-center space-x-1 bg-emerald-50 text-emerald-900 px-2 py-1 rounded-md text-[10px] font-medium">
              {amenity === 'WiFi' && <Wifi className="h-3 w-3" />}
              {amenity === 'Parking' && <Car className="h-3 w-3" />}
              {amenity === 'Restaurant' && <Coffee className="h-3 w-3" />}
              {amenity === 'Garden' && <Trees className="h-3 w-3" />}
              <span>{amenity}</span>
            </span>
          ))}
        </div>

        <button className="w-full bg-emerald-950 text-white font-bold py-3 rounded-xl hover:bg-emerald-900 transition-colors mt-4">
          Book Now
        </button>
      </div>
    </motion.div>
  );
}
