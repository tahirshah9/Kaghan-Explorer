import { Destination } from "../types";
import { MapPin, Clock, Mountain } from "lucide-react";
import { motion } from "motion/react";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border border-emerald-100 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={destination.photo}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 bg-amber-400 text-emerald-950 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          {destination.category}
        </div>
      </div>
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-emerald-950">{destination.name}</h3>
        <p className="text-emerald-800/70 line-clamp-2 text-sm leading-relaxed">
          {destination.description}
        </p>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-emerald-50">
          <div className="flex items-center space-x-2 text-xs text-emerald-900">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>{destination.bestTime}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-emerald-900">
            <MapPin className="h-4 w-4 text-amber-500" />
            <span>{destination.distance}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-emerald-900">
            <Mountain className="h-4 w-4 text-amber-500" />
            <span>{destination.difficulty}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
