import { Request, Router } from "express";
import * as songService from "../services/song-service";

export const songRouter = Router();

songRouter.post("/pair", (req: Request) => {
  songService.pairSongs(req.body.songs);
});

songRouter.post("/get-similar-songs", (req: Request) => {
  songService.getSimilarSongs(req.body.song);
});
