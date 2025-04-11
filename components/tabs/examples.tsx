"use client";

import type React from "react";

import { useState } from "react";
import type { Colord } from "colord";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Check } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Pie,
  PieChart,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { contrastColor } from "@/hooks/contrast-color";

interface ExamplesProps {
  color: Colord;
  activeColor: string;
}

export default function Examples({ color, activeColor }: ExamplesProps) {
  const [activeTab, setActiveTab] = useState("buttons");

  // Generate lighter and darker shades
  const lighterColor = color.lighten(0.2).toHex();
  const darkerColor = color.darken(0.2).toHex();
  const transparentColor = color.alpha(0.7).toRgbString();

  // Sample data for charts
  const barData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 200 },
    { name: "May", value: 350 },
    { name: "Jun", value: 450 },
  ];

  const lineData = [
    { name: "Week 1", value: 100 },
    { name: "Week 2", value: 300 },
    { name: "Week 3", value: 200 },
    { name: "Week 4", value: 500 },
    { name: "Week 5", value: 400 },
    { name: "Week 6", value: 600 },
  ];

  const pieData = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const radarData = [
    { subject: "Math", A: 120, B: 110, fullMark: 150 },
    { subject: "English", A: 98, B: 130, fullMark: 150 },
    { subject: "Physics", A: 86, B: 130, fullMark: 150 },
    { subject: "History", A: 99, B: 100, fullMark: 150 },
    { subject: "Geography", A: 85, B: 90, fullMark: 150 },
    { subject: "Biology", A: 65, B: 85, fullMark: 150 },
  ];

  // Custom styles based on the selected color
  const customStyles = {
    "--custom-color": activeColor,
    "--custom-color-lighter": lighterColor,
    "--custom-color-darker": darkerColor,
  } as React.CSSProperties;

  return (
    <div className="space-y-6" style={customStyles}>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto scrollbar-hide">
          <TabsList
            className="grid grid-cols-4 mb-6 min-w-max border"
            style={{ borderColor: activeColor }}
          >
            <TabsTrigger
              value="buttons"
              style={{
                backgroundColor:
                  activeTab === "buttons" ? activeColor : "transparent",
                color:
                  activeTab === "buttons"
                    ? contrastColor(activeColor)
                    : "inherit",
              }}
            >
              Buttons
            </TabsTrigger>
            <TabsTrigger
              value="charts"
              style={{
                backgroundColor:
                  activeTab === "charts" ? activeColor : "transparent",
                color:
                  activeTab === "charts"
                    ? contrastColor(activeColor)
                    : "inherit",
              }}
            >
              Charts
            </TabsTrigger>
            <TabsTrigger
              value="forms"
              style={{
                backgroundColor:
                  activeTab === "forms" ? activeColor : "transparent",
                color:
                  activeTab === "forms"
                    ? contrastColor(activeColor)
                    : "inherit",
              }}
            >
              Forms
            </TabsTrigger>
            <TabsTrigger
              value="components"
              style={{
                backgroundColor:
                  activeTab === "components" ? activeColor : "transparent",
                color:
                  activeTab === "components"
                    ? contrastColor(activeColor)
                    : "inherit",
              }}
            >
              Components
            </TabsTrigger>
          </TabsList>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TabsContent value="buttons" className="mt-0 rounded-lg">
            <Card className="border" style={{ borderColor: activeColor }}>
              <CardHeader>
                <CardTitle>Button Styles</CardTitle>
                <CardDescription>
                  See how your color looks on different button variants.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="custom-primary-btn"
                    style={{
                      backgroundColor: activeColor,
                      borderColor: activeColor,
                    }}
                  >
                    Primary
                  </Button>
                  <Button
                    variant="secondary"
                    className="custom-secondary-btn"
                    style={{ borderColor: activeColor, color: activeColor }}
                  >
                    Secondary
                  </Button>
                  <Button
                    variant="outline"
                    className="custom-outline-btn"
                    style={{ borderColor: activeColor, color: activeColor }}
                  >
                    Outline
                  </Button>
                  <Button
                    variant="ghost"
                    className="custom-ghost-btn"
                    style={{ color: activeColor }}
                  >
                    Ghost
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    className="custom-primary-btn"
                    style={{
                      backgroundColor: activeColor,
                      borderColor: activeColor,
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" /> With Icon
                  </Button>
                  <Button
                    variant="outline"
                    className="custom-outline-btn"
                    style={{ borderColor: activeColor, color: activeColor }}
                  >
                    <Bell className="mr-2 h-4 w-4" /> Notifications
                  </Button>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    size="sm"
                    className="custom-primary-btn"
                    style={{
                      backgroundColor: activeColor,
                      borderColor: activeColor,
                    }}
                  >
                    Small
                  </Button>
                  <Button
                    className="custom-primary-btn"
                    style={{
                      backgroundColor: activeColor,
                      borderColor: activeColor,
                    }}
                  >
                    Default
                  </Button>
                  <Button
                    size="lg"
                    className="custom-primary-btn"
                    style={{
                      backgroundColor: activeColor,
                      borderColor: activeColor,
                    }}
                  >
                    Large
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="charts" className="mt-0 rounded-lg">
            <Card className="border" style={{ borderColor: activeColor }}>
              <CardHeader>
                <CardTitle>Charts</CardTitle>
                <CardDescription>
                  Visualize your data across different chart types
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bar Chart */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Bar Chart</Label>
                    <Card
                      className="border"
                      style={{ borderColor: activeColor }}
                    >
                      <ChartContainer
                        config={{
                          value: { label: "Value", color: activeColor },
                        }}
                      >
                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                          className="p-4"
                        >
                          <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar
                              dataKey="value"
                              fill={activeColor}
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </Card>
                  </div>

                  {/* Line Chart */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Line Chart</Label>
                    <Card
                      className="border"
                      style={{ borderColor: activeColor }}
                    >
                      <ChartContainer
                        config={{
                          value: { label: "Value", color: activeColor },
                        }}
                      >
                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                          className="p-4"
                        >
                          <LineChart data={lineData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Line
                              type="monotone"
                              dataKey="value"
                              stroke={activeColor}
                              strokeWidth={2}
                              dot={{ fill: activeColor, r: 4 }}
                              activeDot={{
                                fill: activeColor,
                                r: 6,
                                strokeWidth: 0,
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </Card>
                  </div>

                  {/* Area Chart */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Area Chart</Label>
                    <Card
                      className="border"
                      style={{ borderColor: activeColor }}
                    >
                      <ChartContainer
                        config={{
                          value: { label: "Value", color: activeColor },
                        }}
                      >
                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                          className="p-4"
                        >
                          <AreaChart data={lineData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={activeColor}
                              fill={transparentColor}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </Card>
                  </div>

                  {/* Pie Chart */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Pie Chart</Label>
                    <Card
                      className="border"
                      style={{ borderColor: activeColor }}
                    >
                      <ChartContainer
                        config={{
                          value: { label: "Value", color: activeColor },
                        }}
                      >
                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                          className="p-4"
                        >
                          <PieChart>
                            <Pie
                              data={pieData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill={activeColor}
                              dataKey="value"
                              label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                              }
                            >
                              {pieData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={
                                    index === 0
                                      ? activeColor
                                      : color
                                          .alpha(0.8 - index * 0.1)
                                          .toRgbString()
                                  }
                                />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </Card>
                  </div>
                </div>

                {/* Radar Chart - Full width */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Radar Chart</Label>
                  <Card className="border" style={{ borderColor: activeColor }}>
                    <ChartContainer
                      config={{ value: { label: "Value", color: activeColor } }}
                    >
                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                        className="p-4"
                      >
                        <RadarChart
                          cx="50%"
                          cy="50%"
                          outerRadius="75%"
                          data={radarData}
                        >
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis />
                          <Radar
                            name="Value"
                            dataKey="A"
                            stroke={activeColor}
                            fill={transparentColor}
                            fillOpacity={0.6}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="mt-0 rounded-lg">
            <Card className="border" style={{ borderColor: activeColor }}>
              <CardHeader>
                <CardTitle>Form Elements</CardTitle>
                <CardDescription>
                  Form controls with your selected color.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="custom-input">Input Field</Label>
                    <Input
                      placeholder="Enter text here..."
                      className="custom-input"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Checkbox</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="custom-checkbox"
                        className="custom-checkbox"
                        style={{
                          borderColor: activeColor,
                          backgroundColor: "transparent",
                        }}
                        onCheckedChange={() => {}}
                      />
                      <label
                        htmlFor="custom-checkbox"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Accept terms and conditions
                      </label>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label>Radio Group</Label>
                    <RadioGroup defaultValue="option-one">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-one"
                          id="option-one"
                          className="custom-radio"
                          style={{
                            borderColor: activeColor,
                            backgroundColor: "transparent",
                          }}
                        />
                        <Label htmlFor="option-one">Option One</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="option-two"
                          id="option-two"
                          className="custom-radio"
                          style={{
                            borderColor: activeColor,
                            backgroundColor: "transparent",
                          }}
                        />
                        <Label htmlFor="option-two">Option Two</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="components" className="mt-0 rounded-lg">
            <Card className="border" style={{ borderColor: activeColor }}>
              <CardHeader>
                <CardTitle>UI Components</CardTitle>
                <CardDescription>
                  Various components styled with your color.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Badges</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge style={{ backgroundColor: activeColor }}>
                        Default
                      </Badge>
                      <Badge
                        variant="outline"
                        style={{ borderColor: activeColor, color: activeColor }}
                      >
                        Outline
                      </Badge>
                      <Badge
                        variant="secondary"
                        style={{
                          backgroundColor: color.alpha(0.1).toRgbString(),
                          color: activeColor,
                        }}
                      >
                        Secondary
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Card</h4>
                    <Card
                      className="w-full border border-gray-200"
                      style={{ borderColor: color.alpha(0.2).toRgbString() }}
                    >
                      <CardHeader
                        style={{
                          borderBottomColor: color.alpha(0.1).toRgbString(),
                        }}
                      >
                        <CardTitle style={{ color: activeColor }}>
                          Card Title
                        </CardTitle>
                        <CardDescription>
                          This is a card styled with your color.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p>
                          This card has a border and header styled with your
                          selected color.
                        </p>
                      </CardContent>
                      <CardFooter
                        className="border-t"
                        style={{
                          borderTopColor: color.alpha(0.1).toRgbString(),
                        }}
                      >
                        <Button
                          size="sm"
                          className="ml-auto"
                          style={{
                            backgroundColor: activeColor,
                            borderColor: activeColor,
                          }}
                        >
                          Action
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
