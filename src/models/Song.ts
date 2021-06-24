interface SpotifyArtist {
  id: string;
  name: string;
}

interface SpotifyAlbumImage {
  url: string;
}

interface SpotifyAlbum {
  images: SpotifyAlbumImage[];
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  preview_url: string;
}

export interface Song {
  id: string;
  name: string;
  artist: string;
  albumImageUrl: string;
  previewUrl: string;
}

export const mapSpotifyTrackToSong: (spotifyTrack: SpotifyTrack) => Song = (spotifyTrack: SpotifyTrack) => {
  return {
    id: spotifyTrack.id,
    name: spotifyTrack.name,
    artist: spotifyTrack.artists.length ? spotifyTrack.artists[0].name : "",
    albumImageUrl: spotifyTrack.album.images.length
      ? spotifyTrack.album.images[0].url
      : "",
    previewUrl: spotifyTrack.preview_url,
  };
};
