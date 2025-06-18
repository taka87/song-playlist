import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Song } from '../types/Song';
import { useNavigate } from 'react-router-dom';
import "../styles/SongItem.css";

function SongItem() {
  const { id } = useParams();
  const numericId = Number(id);

  const [song, setSong] = useState<Song | null>(null);

    const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('songs');
    if (stored) {
      const songs: Song[] = JSON.parse(stored);
      const found = songs.find((s) => s.id === numericId);
      if (found) setSong(found);
    }
  }, [id]);

  if (!song) return <p>Song not found</p>;

  return (
  <div className="one-song-wrapper">
      <div className="one-song-container">
        <h1 className="one-song-title">🎵 Song Details</h1>

        <div className="song-info">
          <h2>{song.title}</h2>
          <p><strong>Artist:</strong> {song.artist}</p>
          <p><strong>Listened:</strong> {song.listened ? '✅ Yes' : '❌ No'}</p>
        </div>

        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Main Page
        </button>
      </div>
    </div>
  );
}

export default SongItem;