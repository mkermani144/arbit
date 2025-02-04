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
  ],
  'id',
);

export default cardanoNodes;
