"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { AnimatedDock } from "@/components/ui/animated-dock"; 
import { 
  IconBrandInstagram, IconBrandGithub, IconMail, IconHome,
  IconUser, IconSchool, IconListCheck, IconMessage, IconX
} from "@tabler/icons-react";

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<null | any>(null);

  return (
    <main className="bg-slate-950 min-h-screen relative overflow-x-hidden">
      {/* 1. HERO */}
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          Welcome to my Portfolio <br /> mga idol ko
        </motion.h1>
      </LampContainer>

      {/* 2. BENTO GRID */}
      <section className="max-w-6xl mx-auto pb-40 px-4">
        <BentoGrid>
          {items.map((item, i) => (
            <div 
              key={i} 
              className={item.className}
              onClick={() => {
                // Open modal for info cards, let Contact Me handle its own link
                if (item.name !== "Contact Me") setSelectedCard(item);
              }}
            >
              <BentoCard
                name={item.name}
                description={item.description}
                background={item.background}
                Icon={item.Icon}
                href={item.name === "Contact Me" ? item.href : undefined}
                cta={item.cta}
              />
            </div>
          ))}
        </BentoGrid>
      </section>

      {/* 3. MODAL OVERLAY */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCard(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-slate-900 border border-white/10 p-8 shadow-2xl text-center"
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-white"
              >
                <IconX size={24} />
              </button>
              
              <div className="flex flex-col items-center">
                <div className="mb-4 rounded-2xl bg-white/5 p-4 text-white">
                  <selectedCard.Icon size={40} />
                </div>
                <h2 className="mb-4 text-3xl font-bold text-white">{selectedCard.name}</h2>
                <p className="text-lg leading-relaxed text-slate-300 whitespace-pre-wrap">
                  {selectedCard.fullDescription || selectedCard.description}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[110]">
        <AnimatedDock items={dockItems} />
      </div>
    </main>
  );
}

// --- DATA ---

const dockItems = [
  { title: "Home", icon: <IconHome className="h-full w-full text-white" />, link: "#" },
  { title: "Instagram", icon: <IconBrandInstagram className="h-full w-full text-pink-400" />, link: "https://instagram.com/kyslmm" },
  { title: "GitHub", icon: <IconBrandGithub className="h-full w-full text-white" />, link: "https://github.com/miles-111" },
  { 
    title: "Gmail", 
    icon: <IconMail className="h-full w-full text-red-400" />, 
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=milesgraciosomanook@gmail.com" 
  },
];

const items = [
  {
    name: "About Me",
    description: "I am Miles, a BSIT student learning how to build clean and simple websites...",
    fullDescription: "I am Miles, a BSIT student learning how to build clean and simple websites. Still learning, still building, still improving. My Goal is to create websites that feel smooth, modern, and easy to use.",
    className: "col-span-3 lg:col-span-2 cursor-pointer",
    background: <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20" />,
    Icon: IconUser,
    cta: "View Vision",
  },
  {
    name: "BSIT Student",
    description: "Exploring modern web development. Currently learning Next.js, Tailwind, and UI fundamentals.",
    className: "col-span-3 lg:col-span-1 cursor-pointer",
    background: <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20" />,
    Icon: IconSchool,
    cta: "Learn More",
  },
  {
    name: "Currently Learning",
    description: "• Next.js • Tailwind CSS • UI/UX basics • Responsive design",
    fullDescription: "My Current Tech Journey:\n\n• Next.js\n• Tailwind CSS\n• UI/UX Fundamentals\n• Responsive Web Design",
    className: "col-span-3 lg:col-span-1 cursor-pointer",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20" />,
    Icon: IconListCheck,
    cta: "Skills",
  },
  {
    name: "Contact Me",
    description: "Open for collaborations, student projects, or just tech talk. Don't hesitate to connect!",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20" />,
    Icon: IconMessage,
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=milesgraciosomanook@gmail.com&su=Portfolio%20Connection",
    cta: "Email Me",
  },
];