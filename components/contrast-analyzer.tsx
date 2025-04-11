"use client";

import { useState } from "react";
import type { Colord } from "colord";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { colord } from "colord";
import { AlertCircle, Check, X, ArrowLeftRight } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

interface ContrastAnalyzerProps {
  color: Colord;
  activeColor: string;
}

export default function ContrastAnalyzer({
  color,
  activeColor,
}: ContrastAnalyzerProps) {
  const [contrastColor, setContrastColor] = useState("#ffffff");
  const [contrastHexInput, setContrastHexInput] = useState("#ffffff");
  const [activeTab, setActiveTab] = useState("text");

  const contrastColorObj = colord(contrastColor);
  const contrast = color.contrast(contrastColorObj);
  const isAALarge = contrast >= 3;
  const isAANormal = contrast >= 4.5;
  const isAAALarge = contrast >= 4.5;
  const isAAANormal = contrast >= 7;

  // Handle hex input change with validation
  const handleHexChange = (value: string) => {
    setContrastHexInput(value);
    try {
      const newColor = colord(value);
      if (newColor.isValid()) {
        setContrastColor(newColor.toHex());
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Handle color picker change
  const handleColorChange = (newColor: string) => {
    setContrastColor(newColor);
    setContrastHexInput(newColor);
  };

  // Swap colors
  const handleSwapColors = () => {
    const currentColor = color.toHex();
    setContrastColor(currentColor);
    setContrastHexInput(currentColor);
  };

  // Get common text colors
  const getCommonColors = () => {
    return ["#ffffff", "#000000", "#f8f9fa", "#212529", "#6c757d", "#343a40"];
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Label className="text-sm font-medium mb-2 block">
            Background Color
          </Label>
          <div
            className="w-full h-20 rounded-lg flex items-center justify-center text-lg font-medium mb-4 shadow-md"
            style={{
              backgroundColor: color.toHex(),
              color: color.isDark() ? "#ffffff" : "#000000",
            }}
          >
            {color.toHex()}
          </div>

          <Label className="text-sm font-medium mb-2 block">Text Color</Label>
          <div className="space-y-2">
            <div
              className="w-full h-20 rounded-lg flex items-center justify-center text-lg font-medium shadow-md"
              style={{
                backgroundColor: contrastColor,
                color: contrastColorObj.isDark() ? "#ffffff" : "#000000",
              }}
            >
              {contrastColor}
            </div>
            <div className="flex gap-2">
              <Input
                value={contrastHexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                className="font-mono flex-1 custom-input"
              />
              <Button
                variant="outline"
                onClick={handleSwapColors}
                style={{ color: activeColor }}
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Label className="text-sm font-medium mb-2 block">
              Common Colors
            </Label>
            <div className="flex flex-wrap gap-2">
              {getCommonColors().map((commonColor) => (
                <button
                  key={commonColor}
                  className="w-8 h-8 rounded-md border border-gray-200 transition-transform hover:scale-110 shadow-sm"
                  style={{ backgroundColor: commonColor }}
                  onClick={() => {
                    setContrastColor(commonColor);
                    setContrastHexInput(commonColor);
                  }}
                ></button>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <HexColorPicker
              color={contrastColor}
              onChange={handleColorChange}
              className="w-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Label className="text-sm font-medium mb-2 block">
            Contrast Results
          </Label>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <div
              className="text-3xl font-bold text-center mb-4"
              style={{ color: activeColor }}
            >
              {contrast.toFixed(2)}:1
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-center mb-2">
                  WCAG AA
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center">
                    {isAANormal ? (
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className="text-xs">Normal Text</span>
                  </div>
                  <div className="flex items-center">
                    {isAALarge ? (
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className="text-xs">Large Text</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm font-medium text-center mb-2">
                  WCAG AAA
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center">
                    {isAAANormal ? (
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className="text-xs">Normal Text</span>
                  </div>
                  <div className="flex items-center">
                    {isAAALarge ? (
                      <Check className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span className="text-xs">Large Text</span>
                  </div>
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="text">Text Preview</TabsTrigger>
                <TabsTrigger value="info">Requirements</TabsTrigger>
              </TabsList>
              <TabsContent value="text">
                <div
                  className="p-4 rounded-md mt-4"
                  style={{
                    backgroundColor: color.toHex(),
                    color: contrastColor,
                  }}
                >
                  <p className="text-3xl font-bold mb-2">Large Text Example</p>
                  <p className="text-base mb-2">
                    This is normal text size. The contrast ratio should be at
                    least 4.5:1 for WCAG AA compliance.
                  </p>
                  <p className="text-sm">
                    This is small text. Ensuring proper contrast is crucial for
                    accessibility.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="info">
                <Alert className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>WCAG Contrast Requirements</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 text-xs space-y-1 mt-2">
                      <li>
                        AA requires 4.5:1 for normal text and 3:1 for large text
                      </li>
                      <li>
                        AAA requires 7:1 for normal text and 4.5:1 for large
                        text
                      </li>
                      <li>Large text is defined as 18pt+ or 14pt+ bold</li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
