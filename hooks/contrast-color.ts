import { colord } from "colord";

export const contrastColor = (bgColor: string) => {
  const c = colord(bgColor);
  return c.isDark() ? c.lighten(0.4).toHex() : c.darken(0.4).toHex();
};
