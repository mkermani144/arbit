import { keyBy } from '@/utils/keyBy';

const ergoNodes = keyBy(
  [
    {
      id: 'ergo:ERG',
      name: 'ERG',
      coingeckoId: 'ergo',
      decimals: 9,
      nativeId: '',
    },
    {
      id: 'ergo:rsADA',
      name: 'rsADA',
      coingeckoId: 'cardano',
      decimals: 6,
      nativeId:
        'e023c5f382b6e96fbd878f6811aac73345489032157ad5affb84aefd4956c297',
    },
    {
      id: 'ergo:RSN',
      name: 'RSN',
      coingeckoId: 'rosen-bridge',
      decimals: 3,
      nativeId:
        '8b08cdd5449a9592a9e79711d7d79249d7a03c535d17efaee83e216e80a44c4b',
    },
    {
      id: 'ergo:rsSNEK',
      name: 'rsSNEK',
      coingeckoId: 'snek',
      decimals: 0,
      nativeId:
        '8b08cdd5449a9592a9e79711d7d79249d7a03c535d17efaee83e216e80a44c4b',
    },
    {
      id: 'ergo:rsBTC',
      name: 'rsBTC',
      coingeckoId: 'bitcoin',
      decimals: 8,
      nativeId:
        '7a51950e5f548549ec1aa63ffdc38279505b11e7e803d01bcf8347e0123c88b0',
    },
  ],
  'id',
);

export default ergoNodes;
