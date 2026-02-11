"use client" 

import * as React from "react"
import { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
 
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
 
const cn = (...args: any[]) => twMerge(clsx(args));
 
export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}
 
export interface DockItemData {
  link: string;
  icon: React.ReactNode; // Changed Icon to icon to match your page.tsx
  target?: string;
}
 
export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);
 
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-end gap-4 rounded-2xl bg-neutral-900/80 border border-white/10 shadow-xl px-4 pb-3 backdrop-blur-md",
        className,
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX}>
          <Link
            href={item.link}
            target={item.target || "_blank"}
            className="grow flex items-center justify-center w-full h-full"
          >
            {item.icon}
          </Link>
        </DockItem>
      ))}
    </motion.div>
  );
};
 
interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
}
 
export const DockItem = ({ mouseX, children }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScale = useTransform(width, [40, 80], [1, 1.5]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      // Changed bg-primary to bg-white/10 so it's a nice transparent circle
      className="aspect-square w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-6 h-6 grow"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};