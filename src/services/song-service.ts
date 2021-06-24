import { Song } from "../models/Song";
import * as songDAO from "../daos/song-dao";
import * as spotifyService from "./spotify-service";

export const pairSongs = (songs: Song[]) => {
  try {
    const savedSongs = Promise.all(songs.map((song) => songDAO.saveSong(song)));
    savedSongs.then(() => {
      for (let i = 1; i < songs.length; i++) {
        const id1 = songs[i].id;
        for (let j = 0; j < i; j++) {
          const id2 = songs[j].id;
          songDAO.pairSongs(id1, id2);
        }
      }
    });
  } catch (error) {
    // TODO: Error handling
  }
};

export const getSimilarSongs = async (song: Song) => {
  try {
    const songs: Song[] = await songDAO.getSimilarSongs(song.id);
    return songs;
  } catch (error) {
    // TODO: Error handling
    return [];
  }
};

export const generatePlaylist = async (selectedSongs: Song[]) => {
  try {
    const allSimilarSongs: Song[] = [];
    selectedSongs.forEach(async (song) => {
      const similarSongs = await getSimilarSongs(song);
      allSimilarSongs.push(...similarSongs)
    });
    const spotifyRecommendations = await spotifyService.getRecommendations(selectedSongs.map(song => song.id));
    // Finally we pair the songs selected in order to generate more data for better recommendations in the future
    pairSongs(selectedSongs);
    return [...allSimilarSongs, ...spotifyRecommendations].reduce((uniqueSongs: Song[], curSong: Song) => {
      if (!uniqueSongs.find(song => song.id === curSong.id)) {
        uniqueSongs.push(curSong);
      }
      return uniqueSongs;
    }, []);
  } catch (error) {
    // TODO: Error handling
    return [];
  }
}
