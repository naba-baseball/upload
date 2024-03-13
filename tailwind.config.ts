import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>> {
  theme: {
    extend: {
      fontFamily:{
        sans: 'Fira Sans, sans-serif',
      },
      colors: {
        blue: {
          "50": "#f0f2ff",
          "100": "#e4e7ff",
          "200": "#ccd2ff",
          "300": "#a4acff",
          "400": "#7074ff",
          "500": "#3c37ff",
          "600": "#230fff",
          "700": "#1100ff",
          "800": "#0c00da",
          "900": "#0d00c2",
          "950": "#00007a",
        },
        asdf: {
          "50": "#f5f5f6",
          "100": "#e5e6e8",
          "200": "#cecfd3",
          "300": "#acaeb4",
          "400": "#83868d",
          "500": "#686b72",
          "600": "#5a5c63",
          "700": "#4c4d52",
          "800": "#424248",
          "900": "#3a3a3f",
          "950": "#242528",
        },
      },
    },
  },
};
