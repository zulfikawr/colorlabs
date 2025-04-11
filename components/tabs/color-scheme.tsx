"use client";

import type React from "react";

import { useState } from "react";
import type { Colord } from "colord";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Copy, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { contrastColor } from "@/hooks/contrast-color";
import { copyColor } from "@/hooks/copy-share";

interface ColorSchemeProps {
  color: Colord;
  activeColor: string;
}

type SchemeType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "tetradic"
  | "monochromatic"
  | "split-complementary"
  | "shades";

export default function ColorScheme({ color, activeColor }: ColorSchemeProps) {
  const [schemeType, setSchemeType] = useState<SchemeType>("complementary");
  const [count, setCount] = useState(5); // For monochromatic and shades
  const [angle, setAngle] = useState(30); // For analogous and split-complementary
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const getColorScheme = () => {
    const hex = color.toHex();

    switch (schemeType) {
      case "complementary":
        return [hex, color.rotate(180).toHex()];
      case "analogous": {
        const colors = [
          color.rotate(-angle).toHex(),
          hex,
          color.rotate(angle).toHex(),
        ];
        return colors;
      }
      case "triadic":
        return [hex, color.rotate(120).toHex(), color.rotate(240).toHex()];
      case "tetradic":
        return [
          hex,
          color.rotate(90).toHex(),
          color.rotate(180).toHex(),
          color.rotate(270).toHex(),
        ];
      case "split-complementary": {
        const colors = [
          hex,
          color.rotate(180 - angle).toHex(),
          color.rotate(180 + angle).toHex(),
        ];
        return colors;
      }
      case "monochromatic": {
        return Array.from({ length: count }, (_, i) => {
          return i === 0
            ? hex
            : color.lighten((count - 1 - i) / (count - 1)).toHex();
        });
      }
      case "shades": {
        return Array.from({ length: count }, (_, i) => {
          return i === 0 ? hex : color.darken(i / (count - 1)).toHex();
        });
      }
      default:
        return [hex];
    }
  };

  const colorScheme = getColorScheme();

  const toggleColorSelection = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const randomizeAngle = () => {
    setAngle(Math.floor(Math.random() * 60) + 10); // Random angle between 10 and 70
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div className="flex-1">
          <Label
            htmlFor="scheme-type"
            className="text-sm font-medium mb-2 block"
          >
            Scheme Type
          </Label>
          <Select
            value={schemeType}
            onValueChange={(value) => setSchemeType(value as SchemeType)}
          >
            <SelectTrigger id="scheme-type" className="w-full custom-input">
              <SelectValue placeholder="Select scheme" />
            </SelectTrigger>
            <SelectContent
              style={{
                borderColor: activeColor,
              }}
            >
              <SelectItem
                value="complementary"
                style={{
                  color:
                    schemeType === "complementary"
                      ? contrastColor(activeColor)
                      : activeColor,
                }}
              >
                Complementary
              </SelectItem>
              <SelectItem
                value="analogous"
                style={{
                  color:
                    schemeType === "analogous"
                      ? contrastColor(activeColor)
                      : activeColor,
                }}
              >
                Analogous
              </SelectItem>
              <SelectItem
                value="triadic"
                style={{
                  color:
                    schemeType === "triadic"
                      ? contrastColor(activeColor)
                      : activeColor,
                }}
              >
                Triadic
              </SelectItem>
              <SelectItem
                value="tetradic"
                style={{
                  color:
                    schemeType === "tetradic"
                      ? contrastColor(activeColor)
                      : activeColor,
                }}
              >
                Tetradic
              </SelectItem>
              <SelectItem
                value="split-complementary"
                style={{
                  color:
                    schemeType === "split-complementary"
                      ? contrastColor(activeColor)
                      : activeColor,
                }}
              >
                Split Complementary
              </SelectItem>
              <SelectItem
                value="monochromatic"
                style={{
                  color:
                    schemeType === "monochromatic"
                      ? contrastColor(activeColor)
                      : activeColor,
                }}
              >
                Monochromatic
              </SelectItem>
              <SelectItem
                value="shades"
                style={{
                  color:
                    schemeType === "shades"
                      ? contrastColor(activeColor)
                      : activeColor,
                }}
              >
                Shades
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(schemeType === "analogous" ||
          schemeType === "split-complementary") && (
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="angle-slider" className="text-sm font-medium">
                Angle: {angle}°
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={randomizeAngle}
                className="h-8 w-8 p-0 hover:bg-opacity-10"
                style={
                  {
                    color: activeColor,
                    "--hover-bg": activeColor,
                  } as React.CSSProperties
                }
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <Slider
              id="angle-slider"
              min={10}
              max={90}
              step={1}
              value={[angle]}
              onValueChange={(value) => setAngle(value[0])}
            />
          </div>
        )}

        {(schemeType === "monochromatic" || schemeType === "shades") && (
          <div className="flex-1">
            <Label
              htmlFor="count-slider"
              className="text-sm font-medium mb-2 block"
            >
              Count: {count}
            </Label>
            <Slider
              id="count-slider"
              min={3}
              max={9}
              step={1}
              value={[count]}
              onValueChange={(value) => setCount(value[0])}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colorScheme.map((colorHex, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="flex flex-col"
          >
            <div
              className="w-full aspect-square rounded-lg mb-2 cursor-pointer transition-all duration-200 hover:scale-105 shadow-md"
              style={{ backgroundColor: colorHex }}
              onClick={() => toggleColorSelection(colorHex)}
            ></div>
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono">{colorHex}</div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-opacity-10"
                onClick={() => copyColor(colorHex)}
                style={
                  {
                    color: activeColor,
                    "--hover-bg": activeColor,
                  } as React.CSSProperties
                }
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
