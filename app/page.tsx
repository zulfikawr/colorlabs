"use client";

import { useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { colord, extend } from "colord";
import cmykPlugin from "colord/plugins/cmyk";
import namesPlugin from "colord/plugins/names";
import a11yPlugin from "colord/plugins/a11y";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ColorScheme from "@/components/color-scheme";
import ColorFormatDisplay from "@/components/color-format-display";
import ContrastAnalyzer from "@/components/contrast-analyzer";
import ExportOptions from "@/components/export-options";
import Examples from "@/components/examples";
import { contrastColor } from "@/hooks/contrast-color";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BlurBackground from "@/components/blur-background";
import DynamicFavicon from "@/components/dynamic-favicon";

extend([cmykPlugin, namesPlugin, a11yPlugin]);

type ColorFormat = "hex" | "rgb" | "hsl" | "cmyk";

export default function ColorStudio() {
  const [color, setColor] = useState("#6366f1");
  const [colorInput, setColorInput] = useState("#6366f1");
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");
  const [activeTab, setActiveTab] = useState("formats");
  const colorObj = colord(color);

  const handleColorInputChange = (value: string) => {
    setColorInput(value);
    try {
      const newColor = colord(value);
      if (newColor.isValid()) {
        setColor(newColor.toHex());
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  };

  const handleFormatChange = (format: ColorFormat) => {
    setColorFormat(format);
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied", {
      description: `${text} has been copied to clipboard`,
      duration: 2000,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Check out this color on ColorLabs",
          text: `I found this amazing color: ${color}`,
          url: `${window.location.origin}?color=${encodeURIComponent(color.substring(1))}`,
        })
        .catch(console.error);
    } else {
      const url = `${window.location.origin}?color=${encodeURIComponent(color.substring(1))}`;
      handleCopyToClipboard(url);
      toast("Share link copied!", {
        description: "Share link has been copied to clipboard",
        duration: 2000,
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
          {/* Color Picker Section */}
          <motion.div variants={itemVariants} className="mb-8">
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
                        onClick={() => handleCopyToClipboard(color)}
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
                        onClick={handleShare}
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
                          <SelectContent
                            style={{
                              borderColor: color,
                            }}
                          >
                            <SelectItem
                              value="hex"
                              style={{
                                color:
                                  colorFormat === "hex"
                                    ? contrastColor(color)
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
                                    ? contrastColor(color)
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
                                    ? contrastColor(color)
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
                                    ? contrastColor(color)
                                    : color,
                              }}
                            >
                              CMYK
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          value={formattedColor}
                          onChange={(e) =>
                            handleColorInputChange(e.target.value)
                          }
                          className="font-mono flex-1 custom-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Color Tools Section */}
          <motion.div variants={itemVariants}>
            <Card
              className="border rounded-lg shadow-lg p-4"
              style={{ borderColor: color }}
            >
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <div className="overflow-x-auto scrollbar-hide">
                  <TabsList
                    className="grid grid-cols-5 mb-4 min-w-max border"
                    style={{ borderColor: color }}
                  >
                    {[
                      "formats",
                      "schemes",
                      "contrast",
                      "examples",
                      "export",
                    ].map((tab) => (
                      <TabsTrigger key={tab} value={tab} className="capitalize">
                        {tab}
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
                    {activeTab === "formats" && (
                      <ColorFormatDisplay
                        color={colorObj}
                        onCopy={handleCopyToClipboard}
                        activeColor={color}
                      />
                    )}

                    {activeTab === "schemes" && (
                      <ColorScheme
                        color={colorObj}
                        onCopy={handleCopyToClipboard}
                        activeColor={color}
                      />
                    )}

                    {activeTab === "contrast" && (
                      <ContrastAnalyzer color={colorObj} activeColor={color} />
                    )}

                    {activeTab === "examples" && (
                      <Examples color={colorObj} activeColor={color} />
                    )}

                    {activeTab === "export" && (
                      <ExportOptions color={colorObj} activeColor={color} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </Card>
          </motion.div>
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

        [data-state="active"] {
          color: ${contrastColor(color)} !important;
          background-color: ${color} !important;
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
