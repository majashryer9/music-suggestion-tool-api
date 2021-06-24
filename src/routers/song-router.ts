import { Request, Response, Router } from "express";
import * as spotifyService from "../services/spotify-service";
import * as songService from "../services/song-service";

export const songRouter = Router();

songRouter.post("/search", async (req: Request, resp: Response) => {
  const searchTerm = req.body.searchTerm;
  const searchResults = searchTerm ? await spotifyService.search(searchTerm) : [];
  resp.json(searchResults);
});

songRouter.post("/generate", async (req: Request, resp: Response) => {
  // The songs a user initially selected to use to build their playlist 
  const selectedSongs = req.body.selectedSongs;
  const playlistSongs = selectedSongs && selectedSongs.length ? await songService.generatePlaylist(selectedSongs) : [];
  resp.json(playlistSongs);
});
