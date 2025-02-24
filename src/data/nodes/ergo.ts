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
    {
      id: 'ergo:COMET',
      name: 'COMET',
      coingeckoId: 'comet-token',
      decimals: 0,
      nativeId:
        '0cd8c9f416e5b1ca9f986a7f10a84191dfb85941619e49e53c0dc30ebf83324b',
    },
    {
      id: 'ergo:rsHOSKY',
      name: 'rsHOSKY',
      coingeckoId: 'hosky',
      decimals: 0,
      nativeId:
        '6ad70cdbf928a2bdd397041a36a5c2490a35beb4d20eabb5666f004b103c7189',
    },
  ],
  'id',
);

export default ergoNodes;
