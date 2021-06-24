import { Song } from "../models/Song";
import { constants } from "../util/constants";
import { driver } from "../util/neo4j-session";

// CREATE CONSTRAINT ON (s:Song) ASSERT s.id IS UNIQUE;
export const saveSong = (song: Song) => {
  const session = driver.session();
  return session
    .writeTransaction(async (txc) => {
      const query = `MERGE (song:Song { id: $song.id, name: $song.name, artist: $song.artist, albumImageUrl: $song.albumImageUrl, previewUrl: $song.previewUrl })`;
      const params = {
        song,
      };
      await txc.run(query, params);
      return constants.SAVE_SUCCESSFUL;
    })
    .catch(() => {
      throw new Error(constants.SAVE_FAILED);
    })
    .finally(() => session.close());
};

export const pairSongs = (id1: string, id2: string) => {
  const session = driver.session();
  return session
    .writeTransaction(async (txc) => {
      const query = `MATCH (song1:Song { id:$id1 }), (song2:Song { id:$id2 })
                    MERGE (song1)-[r:PAIRED_WITH]-(song2)
                    ON CREATE SET r.count = 1
                    ON MATCH SET r.count = r.count + 1`;
      const params = {
        id1,
        id2,
      };
      await txc.run(query, params);
      return constants.PAIR_SUCCESSFUL;
    })
    .catch(() => {
      throw new Error(constants.PAIR_FAILED);
    })
    .finally(() => session.close());
};

export const getSimilarSongs = (id: string) => {
  const session = driver.session();
  return session
    .readTransaction(async (txc) => {
      const query = `MATCH (s:Song { id: $id })-[r:PAIRED_WITH]-(songs)
                    RETURN songs
                    ORDER BY r.count
                    LIMIT 10`;
      const params = {
        id,
      };
      const results = await txc.run(query, params);
      return results.records.map(record => record.get(0).properties);
    })
    .catch(() => {
      throw new Error(constants.SIMILAR_SONGS_FAILED);
    })
    .finally(() => session.close());
};
