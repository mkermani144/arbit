import { keyBy } from '@/utils/keyBy';

const cardanoNodes = keyBy(
  [
    {
      id: 'cardano:rsERG',
      name: 'rsERG',
      coingeckoId: 'ergo',
      decimals: 9,
      nativeId:
        '04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.7273455247',
    },
    {
      id: 'cardano:ADA',
      name: 'ADA',
      coingeckoId: 'cardano',
      decimals: 6,
      nativeId: '',
    },
    {
      id: 'cardano:rsRSN',
      name: 'rsRSN',
      coingeckoId: 'rosen-bridge',
      decimals: 3,
      nativeId:
        '04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.727352534e',
    },
    {
      id: 'cardano:SNEK',
      name: 'SNEK',
      coingeckoId: 'snek',
      decimals: 0,
      nativeId:
        '279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f.534e454b',
    },
    {
      id: 'cardano:rsBTC',
      name: 'rsBTC',
      coingeckoId: 'bitcoin',
      decimals: 8,
      nativeId:
        '2dbc49f682ad21f6d18705cf446f9f7a277731ab70ae21a454f888b2.7273425443',
    },
    {
      id: 'cardano:rsCOMET',
      name: 'rsCOMET',
      coingeckoId: 'comet-token',
      decimals: 0,
      nativeId:
        'd85d4588d4625b370121597ff88f3c1fa66f2a0cb7e4a7a9573a3c3e.7273434f4d4554',
    },
    {
      id: 'cardano:HOSKY',
      name: 'HOSKY',
      coingeckoId: 'hosky',
      decimals: 0,
      nativeId:
        'a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235.484f534b59',
    },
  ],
  'id',
);

export default cardanoNodes;
