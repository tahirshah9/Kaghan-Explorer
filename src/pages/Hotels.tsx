import { useState, useEffect } from "react";
import { HOTELS as DEFAULT_HOTELS } from "../constants";
import { Hotel } from "../types";
import HotelCard from "../components/HotelCard";
import { Search, Filter, Star } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Hotels() {
  const [hotels, setHotels] = useState<Hotel[]>(DEFAULT_HOTELS);
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, "hotels"), (snapshot) => {
      if (!snapshot.empty) {
        setHotels(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Hotel)));
      }
    });
    return () => unsub();
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase()) || 
                         hotel.location.toLowerCase().includes(search.toLowerCase());
    const matchesRating = hotel.rating >= minRating;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-emerald-950 tracking-tight">Luxury Stays & Hotels</h1>
        <p className="text-emerald-800/60 text-lg">Find the perfect place to rest after your adventures. From luxury resorts to cozy mountain cabins.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300" />
          <input
            type="text"
            placeholder="Search hotels or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-bold text-emerald-950">Min Rating:</span>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setMinRating(star)}
                className={`p-1 transition-colors ${minRating >= star ? "text-amber-400" : "text-emerald-100"}`}
              >
                <Star className={`h-6 w-6 ${minRating >= star ? "fill-amber-400" : ""}`} />
              </button>
            ))}
          </div>
          {minRating > 0 && (
            <button
              onClick={() => setMinRating(0)}
              className="text-xs font-bold text-emerald-800/50 hover:text-emerald-950 underline"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-10 w-10 text-emerald-200" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950">No hotels found</h3>
          <p className="text-emerald-800/60">Try adjusting your search or rating filter.</p>
        </div>
      )}
    </div>
  );
}
