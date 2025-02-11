import { Provider } from '@/types/core';
import ErgoDex from './ergodex';
import MinswapV1 from './minswap-v1';
import MinswapV2 from './minswap-v2';
import RosenBridge from './rosen-bridge';
import Splash from './splash';

export const providerMap = new Map<string, Provider>([
  ['ergodex', ErgoDex],
  ['splash', Splash],
  ['minswapv1', MinswapV1],
  ['minswapv2', MinswapV2],
  ['rosenbridge', RosenBridge],
]);
