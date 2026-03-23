import { Sun, CloudRain, Thermometer, Wind, MapPin, Info, AlertTriangle, Utensils, Wallet, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

export default function Guide() {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    fetch("/api/weather")
      .then(res => res.json())
      .then(data => setWeather(data));
  }, []);

  const sections = [
    {
      icon: Sun,
      title: "Best Time to Visit",
      content: "The ideal time to visit Kaghan Valley is from May to September. During this period, the roads are clear of snow, and the weather is pleasantly cool. July and August are peak months for lush greenery and blooming flowers."
    },
    {
      icon: MapPin,
      title: "How to Get There",
      content: "Kaghan Valley is accessible via the Hazara Motorway. From Islamabad, it takes about 5-6 hours to reach Naran. You can travel by private car, bus, or hire a jeep from Balakot for more rugged terrains."
    },
    {
      icon: Info,
      title: "What to Pack",
      content: "Even in summer, nights can be cold. Pack light woolens, a sturdy pair of walking shoes, sunblock, and a raincoat. If you plan to trek, bring professional gear and a first-aid kit."
    },
    {
      icon: Utensils,
      title: "Local Food to Try",
      content: "Don't miss the fresh Trout fish in Naran, Chapli Kababs, and the local 'Namkeen Gosht'. The street food in Naran Bazar is vibrant and offers a variety of Pakistani delicacies."
    },
    {
      icon: Wallet,
      title: "Currency & Connectivity",
      content: "Pakistani Rupee (PKR) is the local currency. ATMs are available in Naran, but it's wise to carry cash. Mobile connectivity (SCOM, Telenor, Zong) is generally good in Naran but patchy in remote areas."
    },
    {
      icon: AlertTriangle,
      title: "Safety Tips",
      content: "Always check road conditions before traveling, especially during monsoon (July-August) when landslides can occur. Hire experienced local drivers for Babusar Top and Saiful Muluk jeep tracks."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-emerald-950 tracking-tight">Traveler's Guide</h1>
        <p className="text-emerald-800/60 text-lg">Everything you need to know before you embark on your journey to the heaven on earth.</p>
      </div>

      {/* Weather Widget */}
      <div className="bg-emerald-950 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 font-bold uppercase tracking-widest text-sm">
              <MapPin className="h-4 w-4" />
              <span>Current Weather</span>
            </div>
            <h2 className="text-4xl font-bold">Naran, Kaghan Valley</h2>
            <p className="text-emerald-100/60">Live updates from the heart of the valley.</p>
          </div>

          {weather ? (
            <div className="flex items-center space-x-12">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center space-x-4">
                  <Sun className="h-16 w-16 text-amber-400" />
                  <span className="text-7xl font-bold">{weather.temp}°C</span>
                </div>
                <p className="text-xl font-medium text-emerald-100/80">{weather.condition}</p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm border-l border-white/10 pl-12">
                <div className="space-y-1">
                  <p className="text-emerald-100/40 uppercase font-bold text-[10px]">Humidity</p>
                  <div className="flex items-center space-x-2">
                    <CloudRain className="h-4 w-4 text-amber-400" />
                    <span className="font-bold">{weather.humidity}%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-emerald-100/40 uppercase font-bold text-[10px]">Wind Speed</p>
                  <div className="flex items-center space-x-2">
                    <Wind className="h-4 w-4 text-amber-400" />
                    <span className="font-bold">{weather.wind} km/h</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-white/10 h-20 w-20"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-white/10 rounded"></div>
                  <div className="h-4 bg-white/10 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guide Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {sections.map((section, i) => (
          <div key={i} className="space-y-6 group">
            <div className="h-16 w-16 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
              <section.icon className="h-8 w-8 text-emerald-950 transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-950">{section.title}</h3>
            <p className="text-emerald-800/60 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
