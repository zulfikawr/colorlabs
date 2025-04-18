"use client";

import type React from "react";

import { useState } from "react";
import type { Colord } from "colord";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { contrastColor } from "@/hooks/contrast-color";
import { TabsContent } from "@radix-ui/react-tabs";

interface ExportOptionsProps {
  color: Colord;
  activeColor: string;
}

export default function ExportOptions({
  color,
  activeColor,
}: ExportOptionsProps) {
  const [activeTab, setActiveTab] = useState("css");

  const handleCopyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast("Copied", {
      description: `${description} has been copied to clipboard`,
      duration: 2000,
    });
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast("Downloaded!", {
      description: `${filename} has been downloaded`,
      duration: 2000,
    });
  };

  // Generate CSS variables
  const cssVariables = `/* CSS Variables */
:root {
  --color-primary: ${color.toHex()};
  --color-primary-rgb: ${color.toRgb().r}, ${color.toRgb().g}, ${color.toRgb().b};
  --color-primary-hsl: ${Math.round(color.toHsl().h)}, ${Math.round(color.toHsl().s * 100)}%, ${Math.round(color.toHsl().l * 100)}%;
  --color-primary-light: ${color.lighten(0.2).toHex()};
  --color-primary-dark: ${color.darken(0.2).toHex()};
}
`;

  // Generate Tailwind config
  const tailwindConfig = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${color.toHex()}',
          light: '${color.lighten(0.2).toHex()}',
          dark: '${color.darken(0.2).toHex()}',
        },
      },
    },
  },
}
`;

  // Generate SCSS variables
  const scssVariables = `// SCSS Variables
$color-primary: ${color.toHex()};
$color-primary-rgb: ${color.toRgb().r}, ${color.toRgb().g}, ${color.toRgb().b};
$color-primary-hsl: ${Math.round(color.toHsl().h)}, ${Math.round(color.toHsl().s * 100)}%, ${Math.round(color.toHsl().l * 100)}%;
$color-primary-light: ${color.lighten(0.2).toHex()};
$color-primary-dark: ${color.darken(0.2).toHex()};
`;

  // Generate JSON
  const jsonData = JSON.stringify(
    {
      color: {
        hex: color.toHex(),
        rgb: color.toRgb(),
        hsl: color.toHsl(),
        cmyk: color.toCmyk(),
        name: color.toName({ closest: true }) || undefined,
        variants: {
          light: color.lighten(0.2).toHex(),
          dark: color.darken(0.2).toHex(),
        },
      },
    },
    null,
    2,
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList
          className="grid grid-cols-4 mb-4 border"
          style={{ borderColor: activeColor }}
        >
          <TabsTrigger
            value="css"
            style={{
              backgroundColor:
                activeTab === "css" ? activeColor : "transparent",
              color:
                activeTab === "css" ? contrastColor(activeColor) : "inherit",
            }}
          >
            CSS
          </TabsTrigger>
          <TabsTrigger
            value="tailwind"
            style={{
              backgroundColor:
                activeTab === "tailwind" ? activeColor : "transparent",
              color:
                activeTab === "tailwind"
                  ? contrastColor(activeColor)
                  : "inherit",
            }}
          >
            Tailwind
          </TabsTrigger>
          <TabsTrigger
            value="scss"
            style={{
              backgroundColor:
                activeTab === "scss" ? activeColor : "transparent",
              color:
                activeTab === "scss" ? contrastColor(activeColor) : "inherit",
            }}
          >
            SCSS
          </TabsTrigger>
          <TabsTrigger
            value="json"
            style={{
              backgroundColor:
                activeTab === "json" ? activeColor : "transparent",
              color:
                activeTab === "json" ? contrastColor(activeColor) : "inherit",
            }}
          >
            JSON
          </TabsTrigger>
        </TabsList>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TabsContent value="css">
            <div className="space-y-4">
              <Card
                className="p-4 border rounded-lg"
                style={{ borderColor: activeColor }}
              >
                <pre
                  className="text-xs overflow-x-auto whitespace-pre-wrap font-mono"
                  style={{ color: activeColor }}
                >
                  {cssVariables}
                </pre>
              </Card>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    handleCopyToClipboard(cssVariables, "CSS variables")
                  }
                >
                  <Copy
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    handleDownload(cssVariables, "color-variables.css")
                  }
                >
                  <Download
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Download
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tailwind">
            <div className="space-y-4">
              <Card
                className="p-4 border rounded-lg"
                style={{ borderColor: activeColor }}
              >
                <pre
                  className="text-xs overflow-x-auto whitespace-pre-wrap font-mono"
                  style={{ color: activeColor }}
                >
                  {tailwindConfig}
                </pre>
              </Card>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    handleCopyToClipboard(tailwindConfig, "Tailwind config")
                  }
                >
                  <Copy
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    handleDownload(tailwindConfig, "tailwind.config.js")
                  }
                >
                  <Download
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Download
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scss">
            <div className="space-y-4">
              <Card
                className="p-4 border rounded-lg"
                style={{ borderColor: activeColor }}
              >
                <pre
                  className="text-xs overflow-x-auto whitespace-pre-wrap font-mono"
                  style={{ color: activeColor }}
                >
                  {scssVariables}
                </pre>
              </Card>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    handleCopyToClipboard(scssVariables, "SCSS variables")
                  }
                >
                  <Copy
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    handleDownload(scssVariables, "color-variables.scss")
                  }
                >
                  <Download
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Download
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="json">
            <div className="space-y-4">
              <Card
                className="p-4 border rounded-lg"
                style={{ borderColor: activeColor }}
              >
                <pre
                  className="text-xs overflow-x-auto whitespace-pre-wrap font-mono"
                  style={{ color: activeColor }}
                >
                  {jsonData}
                </pre>
              </Card>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleCopyToClipboard(jsonData, "JSON data")}
                >
                  <Copy
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Copy
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleDownload(jsonData, "color-data.json")}
                >
                  <Download
                    className="mr-2 h-4 w-4"
                    style={{ color: activeColor }}
                  />{" "}
                  Download
                </Button>
              </div>
            </div>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
