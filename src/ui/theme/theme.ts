import { ThemedStyledProps } from 'styled-components';

export const theme = {
  colors: {
    main: {
      dark: { normal: '#333', translucent: 'rgba(51, 51, 51, 0.85)' },
      light: { normal: '#fff', translucent: '' },
      primary: { normal: '#90caf9', translucent: 'rgba(144, 202, 249, 0.6)' },
      secondary: { normal: '#282c34', translucent: '' },
      tertiary: { normal: '#ff5555', translucent: 'rgba(255, 85, 85, 0.85)' },
    },
    decorative: {
      light: { normal: '#eee', translucent: '' },
      medium: { normal: '#666', translucent: '' },
      dark: { normal: '#2A2A2A', translucent: 'rgba(42, 42, 42, 0.4)' },
    },
    digital: {
      green: { normal: '#00cc88', translucent: '' },
      yellow: { normal: '#f9e15a', translucent: '' },
      orange: { normal: '#ff9d00', translucent: '' },
      violet: { normal: '#5854A4', translucent: '' },
      blue: { normal: '#6699CC', translucent: '' },
      red: { normal: '#E15A60', translucent: '' },
    },
  },
};

export type Theme = typeof theme;

export type ThemedProps<P> = ThemedStyledProps<P, Theme>;
