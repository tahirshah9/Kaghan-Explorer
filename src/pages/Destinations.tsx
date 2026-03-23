import { useState, useEffect } from "react";
import { DESTINATIONS as DEFAULT_DESTINATIONS } from "../constants";
import { Destination } from "../types";
import DestinationCard from "../components/DestinationCard";
import { Search, Filter } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>(DEFAULT_DESTINATIONS);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, "destinations"), (snapshot) => {
      if (!snapshot.empty) {
        setDestinations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Destination)));
      }
    });
    return () => unsub();
  }, []);

  const categories = ["All", "Lakes", "Meadows", "Mountains", "Towns"];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesFilter = filter === "All" || dest.category === filter;
    const matchesSearch = dest.name.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-emerald-950 tracking-tight">Explore Destinations</h1>
        <p className="text-emerald-800/60 text-lg">From the legendary Saiful Muluk to the heights of Babusar Top, discover every corner of Kaghan Valley.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-emerald-100">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-emerald-300" />
          <input
            type="text"
            placeholder="Search places..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-emerald-50/50 border border-emerald-100 rounded-2xl focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          <Filter className="h-5 w-5 text-emerald-900 mr-2 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all shrink-0 ${
                filter === cat
                  ? "bg-emerald-950 text-amber-400 shadow-lg"
                  : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredDestinations.map((dest) => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>

      {filteredDestinations.length === 0 && (
        <div className="text-center py-24 space-y-4">
          <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <Search className="h-10 w-10 text-emerald-200" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950">No destinations found</h3>
          <p className="text-emerald-800/60">Try adjusting your search or filter to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
}
