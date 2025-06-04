import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function StockPage() {
  const [ticker, setTicker] = useState('NVDA');
  const [minutes, setMinutes] = useState(30);
  const [data, setData] = useState([]);
  const [avg, setAvg] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/stocks/${ticker}?minutes=${minutes}&aggregation=average`)
      .then((res) => {
        setData(res.data.priceHistory);
        setAvg(res.data.averageStockPrice);
      });
  }, [ticker, minutes]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Stock Chart: {ticker}</Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Minutes</InputLabel>
        <Select value={minutes} label="Minutes" onChange={(e) => setMinutes(e.target.value)}>
          {[10, 20, 30, 50, 60].map((m) => (
            <MenuItem key={m} value={m}>{m} minutes</MenuItem>
          ))}
        </Select>
      </FormControl>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 30, right: 30, left: 10, bottom: 10 }}>
          <XAxis dataKey="lastUpdatedAt" tickFormatter={(tick) => tick.slice(11, 16)} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
          {avg && <ReferenceLine y={avg} label="Avg" stroke="red" strokeDasharray="3 3" />}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default StockPage;