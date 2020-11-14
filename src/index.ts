import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

((port = process.env.PORT || 3000) => {
  app.listen(port, () => console.log(`Application listening on port ${port}`));
})();
