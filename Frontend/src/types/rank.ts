export interface RankTypeLevel {
  _id: string;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  label: string;
  maxAP: number;
  minAP: number;
  uiCss: string;
  rankTypeId: string;
}

export interface RankType {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  levels: RankTypeLevel[];
}

