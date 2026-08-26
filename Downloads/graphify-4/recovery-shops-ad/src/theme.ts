import { loadFont as loadHeading } from "@remotion/google-fonts/Oswald";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

export const heading = loadHeading().fontFamily;
export const body = loadBody().fontFamily;

export const FPS = 30;

// Vertical social format
export const WIDTH = 1080;
export const HEIGHT = 1920;

export const colors = {
  bg: "#080B10",
  bgAlt: "#0E141C",
  ink: "#F5F8FC",
  muted: "#8A97A6",
  cold: "#5EE7FF", // cold plunge
  warm: "#FF8A3D", // sauna
  green: "#54E38E", // revenue / retention
  danger: "#FF3B4E", // pattern interrupt
};
