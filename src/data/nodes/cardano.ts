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
  ],
  'id',
);

export default cardanoNodes;
