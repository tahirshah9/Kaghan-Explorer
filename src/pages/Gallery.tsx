import { useState } from "react";
import { DESTINATIONS } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { X, Maximize2 } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Lakes", "Meadows", "Mountains", "Towns"];

  const images = DESTINATIONS.map(d => ({ url: d.photo, category: d.category, title: d.name }));

  const filteredImages = images.filter(img => filter === "All" || img.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-emerald-950 tracking-tight">Visual Gallery</h1>
        <p className="text-emerald-800/60 text-lg">A glimpse into the stunning landscapes of Kaghan Valley. Captured by explorers from around the world.</p>
      </div>

      <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-2 rounded-full text-sm font-bold transition-all shrink-0 ${
              filter === cat
                ? "bg-emerald-950 text-amber-400 shadow-lg"
                : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {filteredImages.map((img, i) => (
          <motion.div
            key={i}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative group cursor-pointer rounded-3xl overflow-hidden"
            onClick={() => setSelectedImage(img.url)}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-emerald-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-center p-6">
              <Maximize2 className="h-10 w-10 text-amber-400 mb-4" />
              <h3 className="text-white font-bold text-xl">{img.title}</h3>
              <p className="text-emerald-100/60 text-sm uppercase tracking-widest font-bold mt-2">{img.category}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-emerald-950/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-white hover:text-amber-400 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-10 w-10" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedImage}
              className="max-w-full max-h-full rounded-3xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
