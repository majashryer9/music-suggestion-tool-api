import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { songRouter } from "./routers/song-router";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/song", songRouter);

((port = process.env.PORT || 3000) => {
  app.listen(port, () => console.log(`Application listening on port ${port}`));
})();
