import { Song } from "../models/Song";
import * as songDAO from "../daos/song-dao";

export const pairSongs = (songs: Song[]) => {
  // TODO: Only pair songs that are not spotify recommendations
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
    const records = await songDAO.getSimilarSongs(song.id);
    const songs: Song[] = records.map((record) => record.get(0).properties);
    return songs;
  } catch (error) {
    // TODO: Error handling
  }
};
