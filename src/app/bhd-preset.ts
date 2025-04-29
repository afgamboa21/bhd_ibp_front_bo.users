import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

const BhdPreset = definePreset(Aura, {
  semantic: {
    fontFamily: 'Noto Sans',
    primary: {
      100: '#E2F2E3',
      200: '#C4E9C0',
      300: '#B9E9B4',
      400: '#50B940',
      500: '#11B719', //Color base
      600: '#00A80C',
      700: '#148C1A',
      800: '#008500',
      900: '#026e02',
      950: '#024502',
    },
  },
});

export default BhdPreset;
