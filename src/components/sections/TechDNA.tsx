import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, X } from 'lucide-react';

import { techStack, TechOrb } from '../../data/techStack';

export const TechDNA = () => {
  const [hoveredTech, setHoveredTech] = useState<TechOrb | null>(null);

  const innerRing = useMemo(() => techStack.filter((t) => t.ring === 'inner'), []);
  const middleRing = useMemo(() => techStack.filter((t) => t.ring === 'middle'), []);
  const outerRing = useMemo(() => techStack.filter((t) => t.ring === 'outer'), []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0A0A0A]">
      {/* Background grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10 flex flex-col items-center">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-display font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-accent to-indigo-400 inline-flex items-center gap-4">
            <Cpu className="text-accent" size={40} />
            Tech DNA
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            My technological ecosystem. Core competencies orbit closest to the center, surrounded by
            secondary tools and the broader development ecosystem.
          </p>
        </div>

        {/* The Orbital System - DESKTOP */}
        <div className="hidden sm:flex relative w-[500px] h-[500px] md:w-[600px] md:h-[600px] items-center justify-center mb-16">
          {/* Center (You) */}
          <div className="absolute z-50 w-24 h-24 bg-gradient-to-br from-accent to-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.3)] border-4 border-[#0A0A0A]">
            <span className="text-white font-display font-bold text-3xl tracking-tighter">S</span>
          </div>

          {/* Inner Ring Track */}
          <div className="absolute w-[55%] h-[55%] border border-slate-700/40 rounded-full" />
          {/* Inner Ring Nodes */}
          {innerRing.map((tech, i) => {
            const angle = (i / innerRing.length) * 360;
            const ringSize = 27.5; // % of container as radius
            return (
              <OrbitalNode
                key={tech.name}
                tech={tech}
                angle={angle}
                radius={ringSize}
                setHoveredTech={setHoveredTech}
              />
            );
          })}

          {/* Middle Ring Track */}
          <div className="absolute w-[78%] h-[78%] border border-slate-800/50 rounded-full" />
          {/* Middle Ring Nodes */}
          {middleRing.map((tech, i) => {
            const angle = (i / middleRing.length) * 360;
            const ringSize = 39;
            return (
              <OrbitalNode
                key={tech.name}
                tech={tech}
                angle={angle}
                radius={ringSize}
                setHoveredTech={setHoveredTech}
              />
            );
          })}

          {/* Outer Ring Track */}
          <div className="absolute w-[100%] h-[100%] border border-slate-800/30 rounded-full" />
          {/* Outer Ring Nodes */}
          {outerRing.map((tech, i) => {
            const angle = (i / outerRing.length) * 360;
            const ringSize = 50;
            return (
              <OrbitalNode
                key={tech.name}
                tech={tech}
                angle={angle}
                radius={ringSize}
                setHoveredTech={setHoveredTech}
              />
            );
          })}

          {/* Center Info Panel (Shows on Hover) */}
          <AnimatePresence>
            {hoveredTech && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute -bottom-20 z-[60] bg-[#111111]/95 backdrop-blur-xl border p-6 rounded-2xl shadow-2xl flex flex-col items-center min-w-[220px]"
                style={{ borderColor: hoveredTech.color }}
              >
                <div
                  className="text-xs font-bold uppercase tracking-widest mb-1"
                  style={{ color: hoveredTech.color }}
                >
                  {hoveredTech.ring} ring
                </div>
                <div className="text-2xl font-bold text-white mb-1">{hoveredTech.name}</div>
                <div className="text-slate-400 text-sm">{hoveredTech.usage}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Grid View */}
        <div className="sm:hidden w-full space-y-6">
          <MobileRingList title="Core Mastery" items={innerRing} />
          <MobileRingList title="Backend & Secondary" items={middleRing} />
          <MobileRingList title="Tools & Ecosystem" items={outerRing} />
        </div>
      </div>
    </section>
  );
};

/* =============================================
   Orbital Node Component
   Uses absolute positioning from center of the
   parent with a CSS rotation animation wrapper.
   ============================================= */
const OrbitalNode = ({
  tech,
  angle,
  radius,
  setHoveredTech,
}: {
  tech: TechOrb;
  angle: number;
  radius: number;
  setHoveredTech: (t: TechOrb | null) => void;
}) => {
  // Convert polar to cartesian (% based from center)
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <div
      className="absolute z-40 group"
      style={{
        top: `calc(50% + ${y}%)`,
        left: `calc(50% + ${x}%)`,
        transform: 'translate(-50%, -50%)',
      }}
      onMouseEnter={() => setHoveredTech(tech)}
      onMouseLeave={() => setHoveredTech(null)}
      onClick={() => setHoveredTech(tech)}
    >
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-xs md:text-sm font-bold text-white cursor-pointer shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:z-50"
        style={{
          backgroundColor: '#1A1A1A',
          border: `2px solid ${tech.color}`,
          boxShadow: `0 0 20px ${tech.color}30`,
        }}
      >
        {tech.name.substring(0, 2)}
      </div>
    </div>
  );
};

/* =============================================
   Mobile Fallback
   ============================================= */
const MobileRingList = ({ title, items }: { title: string; items: TechOrb[] }) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
    <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">{title}</h3>
    <div className="flex flex-wrap gap-2">
      {items.map((tech) => (
        <div
          key={tech.name}
          className="px-3 py-1.5 rounded-full border bg-black/50 text-sm text-slate-300"
          style={{ borderColor: `${tech.color}40` }}
        >
          {tech.name}
        </div>
      ))}
    </div>
  </div>
);

export default TechDNA;
