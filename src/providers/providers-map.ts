import { Provider } from '@/types/core';
import ErgoDex from './ergodex';
import Minswap from './minswap';
import Splash from './splash';

export const providerMap = new Map<string, Provider>([
  ['ergodex', ErgoDex],
  ['splash', Splash],
  ['minswap', Minswap],
]);
