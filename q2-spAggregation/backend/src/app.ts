import express from "express";
import cors from "cors";
import stockRoutes from "./routes/stockRoutes";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use("/api/stocks", stockRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
