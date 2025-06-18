import { useState } from 'react';
import { Song } from '../types/Song';
import "../styles/SongForm.css";

type Props = {
  onAdd: (song: Song) => void;
};

function SongForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [listened, setListened] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ❌ не презареждай страницата, няма form action

    const newSong: Song = {
      id:  Date.now(),
      title,
      artist,
      listened,
    };

    onAdd(newSong);

    setTitle('');
    setArtist('');
    setListened(false);
  };

  return (
    <form onSubmit={handleSubmit} className="song-form">
      <input
        className="song-input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="song-input"
        placeholder="Artist"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={listened}
          onChange={(e) => setListened(e.target.checked)}
        />
        Listened
      </label>
      <button type="submit" className="submit-button">
        Add Song
      </button>
    </form>
  );
}

export default SongForm;