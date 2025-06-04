import { Request, Response } from "express";
import StockData from "../utils/fakedata";

export const getStockAverage = (req: any, res: any) => {
  const { ticker, minutes } = req.query;

  if (!ticker || !minutes) return res.status(400).json({ error: "ticker and minutes are required" });

  const history = StockData[ticker as string] || [];
  const now = new Date();

  const filtered = history.filter(p => {
    const time = new Date(p.lastUpdatedAt);
    return (now.getTime() - time.getTime()) / 60000 <= parseInt(minutes as string);
  });

  const sum = filtered.reduce((a:any, b:any) => a + b.price, 0);
  const avg = filtered.length ? sum / filtered.length : 0;

  res.json({
    averageStockPrice: avg,
    priceHistory: filtered
  });
};

export const getStockCorrelation = (req: any, res: any) => {
  const { ticker, minutes } = req.query;
  const tickers = Array.isArray(ticker) ? ticker as string[] : [];


  if (tickers.length !== 2 || !minutes) {
    return res.status(400).json({ error: "Exactly 2 tickers and 'minutes' required" });
  }

  const now = new Date();
  const getRecent = (symbol: string) =>
    (StockData[symbol] || []).filter((p:any) => (now.getTime() - new Date(p.lastUpdatedAt).getTime()) / 60000 <= parseInt(minutes as string));

  const recent1 = getRecent(tickers[0]);
  const recent2 = getRecent(tickers[1]);

  const minLength = Math.min(recent1.length, recent2.length);
  const values1 = recent1.slice(0, minLength).map(p => p.price);
  const values2 = recent2.slice(0, minLength).map(p => p.price);

  const correlation = pearson(values1, values2);

  const avg1 = values1.reduce((a:any, b:any) => a + b, 0) / values1.length;
  const avg2 = values2.reduce((a:any, b:any) => a + b, 0) / values2.length;

  res.json({
    correlation,
    stocks: {
      [tickers[0]]: {
        averagePrice: avg1,
        priceHistory: recent1
      },
      [tickers[1]]: {
        averagePrice: avg2,
        priceHistory: recent2
      }
    }
  });
};

function pearson(x: number[], y: number[]): number {
  const n = x.length;
  const avgX = x.reduce((a, b) => a + b, 0) / n;
  const avgY = y.reduce((a, b) => a + b, 0) / n;

  const numerator = x.reduce((sum, xi, i) => sum + (xi - avgX) * (y[i] - avgY), 0);
  const denominator = Math.sqrt(
    x.reduce((sum, xi) => sum + Math.pow(xi - avgX, 2), 0) *
    y.reduce((sum, yi) => sum + Math.pow(yi - avgY, 2), 0)
  );

  return denominator === 0 ? 0 : +((numerator / denominator).toFixed(4));
}

