"use client";

import { useState, useMemo } from "react";
import { HexColorPicker } from "react-colorful";
import { colord } from "colord";
import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { copyColor, shareColor } from "@/hooks/copy-share";

type ColorFormat = "hex" | "rgb" | "hsl" | "cmyk";

interface ColorPickerProps {
  color: string;
  onChange?: (color: string) => void;
}

export default function ColorPicker({
  color: initialColor,
  onChange,
}: ColorPickerProps) {
  const [color, setColor] = useState(initialColor);
  const [colorInput, setColorInput] = useState(initialColor);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const colorObj = colord(color);

  const formattedColor = useMemo(() => {
    const c = colord(colorInput);
    switch (colorFormat) {
      case "hex":
        return c.toHex();
      case "rgb":
        return c.toRgbString();
      case "hsl":
        return c.toHslString();
      case "cmyk": {
        const cmyk = c.toCmyk();
        return `cmyk(${Math.round(cmyk.c * 100)}%, ${Math.round(cmyk.m * 100)}%, ${Math.round(cmyk.y * 100)}%, ${Math.round(cmyk.k * 100)}%)`;
      }
      default:
        return c.toHex();
    }
  }, [colorInput, colorFormat]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    setColorInput(newColor);
    onChange?.(newColor);
  };

  const handleColorInputChange = (value: string) => {
    setColorInput(value);
    try {
      const newColor = colord(value);
      if (newColor.isValid()) {
        setColor(newColor.toHex());
        onChange?.(newColor.toHex());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormatChange = (format: ColorFormat) => {
    setColorFormat(format);
  };

  return (
    <motion.div className="mb-8">
      <Card
        className="overflow-hidden border shadow-lg"
        style={{ borderColor: color }}
      >
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Color Display */}
            <div
              className="flex flex-col items-center justify-center p-8 min-h-[300px] transition-colors duration-1000"
              style={{
                backgroundColor: color,
                color: colorObj.isDark() ? "white" : "black",
              }}
            >
              <h2 className="text-3xl font-bold mb-2 tracking-tight">
                {colorObj.toName({ closest: true }) || "Custom Color"}
              </h2>
              <p className="text-lg opacity-80 mb-6">{color}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-0 transition-colors duration-1000"
                  onClick={() => copyColor(color)}
                >
                  <Copy
                    className="mr-2 h-4 w-4 transition-colors duration-1000"
                    style={{
                      color: colorObj.isDark() ? "white" : "black",
                    }}
                  />{" "}
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/20 backdrop-blur-md hover:bg-white/30 border-0 transition-colors duration-1000"
                  onClick={() => shareColor(color)}
                >
                  <Share2
                    className="mr-2 h-4 w-4 transition-colors duration-1000"
                    style={{
                      color: colorObj.isDark() ? "white" : "black",
                    }}
                  />{" "}
                  Share
                </Button>
              </div>
            </div>

            {/* Color Picker */}
            <div className="p-8 bg-white">
              <div className="flex flex-col items-center">
                <HexColorPicker
                  color={color}
                  onChange={handleColorChange}
                  className="w-full max-w-[240px] mb-6"
                />

                <div className="w-full flex gap-2 items-center">
                  <Select
                    value={colorFormat}
                    onValueChange={(value) =>
                      handleFormatChange(value as ColorFormat)
                    }
                  >
                    <SelectTrigger className="w-24 custom-input">
                      <SelectValue placeholder="Format" />
                    </SelectTrigger>
                    <SelectContent style={{ borderColor: color }}>
                      <SelectItem
                        value="hex"
                        style={{
                          color:
                            colorFormat === "hex"
                              ? colorObj.isDark()
                                ? "white"
                                : "black"
                              : color,
                        }}
                      >
                        HEX
                      </SelectItem>
                      <SelectItem
                        value="rgb"
                        style={{
                          color:
                            colorFormat === "rgb"
                              ? colorObj.isDark()
                                ? "white"
                                : "black"
                              : color,
                        }}
                      >
                        RGB
                      </SelectItem>
                      <SelectItem
                        value="hsl"
                        style={{
                          color:
                            colorFormat === "hsl"
                              ? colorObj.isDark()
                                ? "white"
                                : "black"
                              : color,
                        }}
                      >
                        HSL
                      </SelectItem>
                      <SelectItem
                        value="cmyk"
                        style={{
                          color:
                            colorFormat === "cmyk"
                              ? colorObj.isDark()
                                ? "white"
                                : "black"
                              : color,
                        }}
                      >
                        CMYK
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    value={formattedColor}
                    onChange={(e) => handleColorInputChange(e.target.value)}
                    className="font-mono flex-1 custom-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
