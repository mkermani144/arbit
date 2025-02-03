export type ArbitNodeId = string;
export type ArbitEdgeId = string;
export type ArbitProviderId = string;
export type MarketId = string;

export interface GraphNode {
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
  x2y(marketId: string, amounts: number[]): Promise<number[]>;
  y2x(marketId: string, amounts: number[]): Promise<number[]>;
  getExplicitFee(marketId: string, amounts: number[]): Promise<number[]>;
}

export interface GraphEdge {
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
