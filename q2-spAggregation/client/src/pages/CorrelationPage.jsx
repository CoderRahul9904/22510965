import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { HeatMapGrid } from 'react-grid-heatmap';

function CorrelationPage() {
  const [minutes, setMinutes] = useState(30);
  const [matrix, setMatrix] = useState([]);
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/stockcorrelation/all?minutes=${minutes}`).then((res) => {
      setMatrix(res.data.matrix);
      setTickers(res.data.tickers);
    });
  }, [minutes]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Correlation Heatmap</Typography>

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Minutes</InputLabel>
        <Select value={minutes} onChange={(e) => setMinutes(e.target.value)}>
          {[10, 20, 30, 50, 60].map((m) => (
            <MenuItem key={m} value={m}>{m} minutes</MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ marginTop: 30 }}>
        <HeatMapGrid
          data={matrix}
          xLabels={tickers}
          yLabels={tickers}
          background={(x, y, value) => `rgb(${255 - value * 255}, ${255 - Math.abs(value) * 255}, ${255})`}
          cellHeight="2rem"
          cellWidth="2rem"
          xLabelsStyle={(index) => ({ fontSize: '12px', transform: 'rotate(-45deg)' })}
          yLabelsStyle={() => ({ fontSize: '12px' })}
          cellStyle={{ textAlign: 'center', border: '1px solid #ccc' }}
          cellRender={(value) => value.toFixed(2)}
        />
      </div>
    </Container>
  );
}

export default CorrelationPage;