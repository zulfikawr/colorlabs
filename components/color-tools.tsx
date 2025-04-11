"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import ColorScheme from "@/components/tabs/color-scheme";
import ColorFormatDisplay from "@/components/tabs/color-format-display";
import ContrastAnalyzer from "@/components/tabs/contrast-analyzer";
import ExportOptions from "@/components/tabs/export-options";
import Examples from "@/components/tabs/examples";
import { contrastColor } from "@/hooks/contrast-color";
import type { Colord } from "colord";

interface ColorToolsProps {
  color: Colord;
  activeColor: string;
}

const tabVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const tabs = [
  { id: "formats", label: "formats", component: ColorFormatDisplay },
  { id: "schemes", label: "schemes", component: ColorScheme },
  { id: "contrast", label: "contrast", component: ContrastAnalyzer },
  { id: "examples", label: "examples", component: Examples },
  { id: "export", label: "export", component: ExportOptions },
];

export default function ColorTools({ color, activeColor }: ColorToolsProps) {
  const [activeTab, setActiveTab] = useState("formats");

  return (
    <motion.div variants={tabVariants}>
      <Card
        className="border rounded-lg shadow-lg p-4"
        style={{ borderColor: activeColor }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto scrollbar-hide">
            <TabsList
              className="grid grid-cols-5 mb-4 min-w-max border"
              style={{ borderColor: activeColor }}
            >
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="capitalize transition-colors duration-200"
                  style={{
                    backgroundColor:
                      activeTab === tab.id ? activeColor : "transparent",
                    color:
                      activeTab === tab.id
                        ? contrastColor(activeColor)
                        : "inherit",
                  }}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="mt-0 rounded-lg"
            >
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                  <tab.component color={color} activeColor={activeColor} />
                </TabsContent>
              ))}
            </motion.div>
          </AnimatePresence>
        </Tabs>
      </Card>
    </motion.div>
  );
}
