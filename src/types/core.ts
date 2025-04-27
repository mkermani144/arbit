export type ArbitNodeId = string;
export type ArbitEdgeId = string;
export type ArbitProviderId = string;
export type MarketId = string;

export interface ArbitNode {
  id: ArbitNodeId;
  name: string;
  decimals: number;
  nativeId: string;
  coingeckoId: string;
}

export interface Provider {
  id: ArbitProviderId;
  name: string;
  type: 'real' | 'abstract';
  url: string;
  prefetchMarketData?: () => Promise<void>;
  x2y(marketId: string, amounts: number[]): Promise<number[]>;
  y2x(marketId: string, amounts: number[]): Promise<number[]>;
  getExplicitFee(marketId: string, amounts: number[]): Promise<number[]>;
}

export interface ArbitEdge {
  id: ArbitEdgeId;
  nodes: {
    x: ArbitNodeId;
    y: ArbitNodeId;
  };
  market: {
    provider: ArbitProviderId;
    id: MarketId;
  };
}

export interface ArbitGraph {
  nodes: ArbitNodeId[];
  edges: ArbitEdgeId[];
}

export interface GraphRepresentedArbit {
  arbit: {
    edgeId: ArbitEdgeId;
    optimalInput: number;
    fee: number;
  }[];
  finalOutput: number;
  profitUsd: number;
  fund: number;
  arbitStart: ArbitNodeId;
}

export interface Arbit {
  steps: {
    id: string;
    from: {
      token: ArbitNode;
      amount: number;
    };
    to: {
      token: ArbitNode;
      amount: number;
    };
    provider: {
      name: string;
      url: string;
    };
    fee: {
      usd: number;
    };
    profit: {
      usd: number;
      percent: number;
    };
  }[];
  profit: {
    usd: number;
    percent: number;
  };
}
