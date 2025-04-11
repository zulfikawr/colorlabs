"use client";

import { useState } from "react";
import { colord, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";
import { motion } from "framer-motion";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BlurBackground from "@/components/blur-background";
import DynamicFavicon from "@/components/dynamic-favicon";
import ColorPicker from "@/components/color-picker";
import ColorTools from "@/components/color-tools";

extend([cmykPlugin, namesPlugin, a11yPlugin]);

export default function ColorStudio() {
  const [color, setColor] = useState("#6366f1");
  const colorObj = colord(color);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <DynamicFavicon color={color} />

      <BlurBackground color={color} />

      <Header color={color} />

      <main className="max-w-5xl mx-auto px-4 py-8 relative z-1">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ColorPicker
            color={color}
            onChange={(newColor) => setColor(newColor)}
          />

          <ColorTools color={colorObj} activeColor={color} />
        </motion.div>
      </main>

      <Footer color={color} />

      <style jsx global>{`
        .custom-input {
          border-color: ${color} !important;
        }

        [data-state="checked"] {
          background-color: ${color} !important;
          border-color: ${color} !important;
        }

        .recharts-default-tooltip {
          border-color: ${colorObj.alpha(0.2).toRgbString()} !important;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
