import React from "react";
import { Command, Compass, Disc, Cpu } from "lucide-react";

export default function LogosBar() {
  const logos = [
    { name: "Sisyphus", location: "Paris\u201426", icon: Command },
    { name: "Magnolia", location: "Tokyo\u201426", icon: Compass },
    { name: "Epicurious", location: "Oslo\u201426", icon: Disc },
    { name: "Initech", location: "Geneva\u201426", icon: Cpu }
  ];

  return (
    <div id="logos-section" className="border-b border-black/5 dark:border-[#453027]/40 bg-white/20 dark:bg-white/[0.02] p-8 sm:p-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-black/40 dark:text-white/40">
          <div>Selected Clients & Partners</div>
          <div className="flex flex-wrap gap-x-12 gap-y-4 w-full sm:w-auto justify-between sm:justify-end">
            {logos.map((logo, idx) => {
              const Icon = logo.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon className="w-3.5 h-3.5 text-black/30 dark:text-white/30 stroke-[1.5]" />
                  <span className="text-black dark:text-white font-semibold tracking-widest">{logo.name}</span>
                  <span className="text-[9px] text-black/20 dark:text-white/20 font-light lowercase font-serif italic tracking-normal">({logo.location})</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
