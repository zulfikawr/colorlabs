"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import type { Colord } from "colord";
import { Card } from "./ui/card";

interface ColorFormatDisplayProps {
  color: Colord;
  onCopy: (text: string) => void;
  activeColor: string;
}

export default function ColorFormatDisplay({
  color,
  onCopy,
  activeColor,
}: ColorFormatDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const formats = [
    {
      name: "HEX",
      value: color.toHex(),
      description: "Hexadecimal color code",
    },
    {
      name: "RGB",
      value: color.toRgbString(),
      description: "Red, Green, Blue values",
    },
    {
      name: "HSL",
      value: color.toHslString(),
      description: "Hue, Saturation, Lightness",
    },
    {
      name: "CMYK",
      value: formatCmyk(color.toCmyk()),
      description: "Cyan, Magenta, Yellow, Key (Black)",
    },
  ];

  const handleCopy = (text: string, index: number) => {
    onCopy(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formats.map((format, index) => (
          <motion.div
            key={format.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className="flex items-center justify-between p-4 border transition-colors duration-1000"
              style={{ borderColor: `${activeColor}` }}
            >
              <div>
                <div className="font-medium text-gray-800">{format.name}</div>
                <div className="text-sm text-gray-600">
                  {format.description}
                </div>
                <div className="text-sm font-mono mt-1">{format.value}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(format.value, index)}
                className="h-9 w-9 hover:bg-opacity-90"
                style={
                  {
                    color: activeColor,
                  } as React.CSSProperties
                }
              >
                {copiedIndex === index ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function formatCmyk(cmyk: { c: number; m: number; y: number; k: number }) {
  const { c, m, y, k } = cmyk;
  const formatPercent = (value: number) => Math.round(value * 100) + "%";
  return `cmyk(${formatPercent(c)}, ${formatPercent(m)}, ${formatPercent(y)}, ${formatPercent(k)})`;
}
