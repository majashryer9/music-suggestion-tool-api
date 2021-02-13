import { Request, Response, Router } from "express";
import * as spotifyService from "../services/spotify-service";

export const songRouter = Router();

songRouter.post("/search", async (req: Request, resp: Response) => {
  const searchResults = await spotifyService.search(req.body.searchTerm);
  resp.json(searchResults);
});
