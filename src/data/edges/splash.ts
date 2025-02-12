import { keyBy } from '@/utils/keyBy';

const splashEdges = keyBy(
  [
    {
      id: 'splash:rsERG-ADA',
      nodes: { x: 'cardano:rsERG', y: 'cardano:ADA' },
      market: {
        id: '04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.7273455247',
        provider: 'splash',
      },
    },
    {
      id: 'splash:rsRSN-ADA',
      nodes: { x: 'cardano:rsRSN', y: 'cardano:ADA' },
      market: {
        id: '04b95368393c821f180deee8229fbd941baaf9bd748ebcdbf7adbb14.727352534e',
        provider: 'splash',
      },
    },
    {
      id: 'splash:SNEK-ADA',
      nodes: { x: 'cardano:SNEK', y: 'cardano:ADA' },
      market: {
        id: '279c909f348e533da5808898f87f9a14bb2c3dfbbacccd631d927a3f.534e454b',
        provider: 'splash',
      },
    },
    {
      id: 'splash:rsBTC-ADA',
      nodes: { x: 'cardano:rsBTC', y: 'cardano:ADA' },
      market: {
        id: '2dbc49f682ad21f6d18705cf446f9f7a277731ab70ae21a454f888b2.7273425443',
        provider: 'splash',
      },
    },
  ],
  'id',
);

export default splashEdges;
