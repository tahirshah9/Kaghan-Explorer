import { useState, useEffect } from "react";
import { PACKAGES as DEFAULT_PACKAGES } from "../constants";
import { TourPackage } from "../types";
import PackageCard from "../components/PackageCard";
import { ShieldCheck, Map, Clock, Users } from "lucide-react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Packages() {
  const [packages, setPackages] = useState<TourPackage[]>(DEFAULT_PACKAGES);

  useEffect(() => {
    if (!db) return;
    const unsub = onSnapshot(collection(db, "packages"), (snapshot) => {
      if (!snapshot.empty) {
        setPackages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TourPackage)));
      }
    });
    return () => unsub();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-emerald-950 tracking-tight">Curated Tour Packages</h1>
        <p className="text-emerald-800/60 text-lg">Leave the planning to us. Our all-inclusive packages cover everything from transport to luxury stays.</p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {[
          { icon: ShieldCheck, title: "Safe & Secure", desc: "Verified transport and stays" },
          { icon: Map, title: "Expert Guides", desc: "Local knowledge at every step" },
          { icon: Clock, title: "Flexible Dates", desc: "Book according to your schedule" },
          { icon: Users, title: "Group Discounts", desc: "Special rates for large groups" },
        ].map((benefit, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-emerald-100 text-center space-y-4 shadow-sm">
            <div className="h-12 w-12 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto">
              <benefit.icon className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="font-bold text-emerald-950">{benefit.title}</h3>
            <p className="text-sm text-emerald-800/60 leading-relaxed">{benefit.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      {/* Custom Inquiry */}
      <section className="bg-emerald-950 rounded-[3rem] p-12 md:p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Need a Custom Package?</h2>
          <p className="text-emerald-100/60 max-w-2xl mx-auto text-lg">We can design a personalized itinerary for your family, friends, or corporate group. Just tell us your requirements.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
            <button className="bg-amber-400 text-emerald-950 font-bold px-10 py-4 rounded-2xl hover:bg-amber-300 transition-all">
              Request Custom Quote
            </button>
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold px-10 py-4 rounded-2xl hover:bg-white/20 transition-all">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
