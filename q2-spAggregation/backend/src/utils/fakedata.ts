export type StockEntry = {
  price: number;
  lastUpdatedAt: string;
};

export type StockDataType = {
  [ticker: string]: StockEntry[];
};

const StockData: StockDataType = {
  NVDA: [
    { price: 500, lastUpdatedAt: new Date().toISOString() },
    { price: 520, lastUpdatedAt: new Date(Date.now() - 10 * 60000).toISOString() }
  ],
  PYPL: [
    { price: 100, lastUpdatedAt: new Date().toISOString() },
    { price: 102, lastUpdatedAt: new Date(Date.now() - 5 * 60000).toISOString() }
  ]
};

export default StockData;
