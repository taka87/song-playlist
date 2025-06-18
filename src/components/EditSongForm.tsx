import { useState } from 'react';
import { Song } from "../types/Song";
import "../styles/EditSongForm.css"

// material buttons
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

interface EditSongFormProps {
  song: Song;
  onSave: (updatedSong: Song) => void;
  onCancel: () => void;
}

export function EditSongForm({ song, onSave, onCancel }: EditSongFormProps) {
  const [title, setTitle] = useState(song.title);
  const [artist, setArtist] = useState(song.artist);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedSong = { ...song, title, artist };
    onSave(updatedSong);
  };

  return (
    <div
      className="song-actions"
      onClick={(e) => e.stopPropagation()} // спира навигацията при клик върху бутоните
    > 
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        <input value={artist} onChange={(e) => setArtist(e.target.value)} />

          {/* material icons */}
          <Tooltip title="Save changes">
          <IconButton type="submit" color="success" aria-label="save">
              <SaveIcon />
          </IconButton>
          </Tooltip>

          <Tooltip title="Cancel editing">
          <IconButton type="button" onClick={onCancel} color="error" aria-label="cancel">
              <CancelIcon />
          </IconButton>
          </Tooltip>
      </form>
    </div>
  );
}