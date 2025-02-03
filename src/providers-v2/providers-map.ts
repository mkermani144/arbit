import { Provider } from '@/types/core-v2';
import ErgoDex from './ergodex';
import Minswap from './minswap';
import RosenBridge from './rosen-bridge';
import Splash from './splash';

export const providerMap = new Map<string, Provider>([
  ['ergodex', ErgoDex],
  ['splash', Splash],
  ['minswap', Minswap],
  ['rosenbridge', RosenBridge],
]);
