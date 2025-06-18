import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// MUI icons & components
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Pagination,
} from "@mui/material";
// import './styles/SongList.css'; 
import "../styles/SongList.css";

// Custom components & utils
import { Song } from "../types/Song";
import SongForm from "../components/SongForm";
import { EditSongForm } from "../components/EditSongForm";
import FilterButtons from "../components/FilterButtons";
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorage";
import { initialSongs } from "../data/initialSongs";

const LOCAL_STORAGE_KEY = "songs";

function SongList() {
  // Song list state
  const [songs, setSongs] = useState<Song[]>([]);

  // Edit song state
  const [editingSongId, setEditingSongId] = useState<number | null>(null);

  // Delete confirmation dialog
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);

  // Filter state: all / listened / not listened
  const [filter, setFilter] = useState<'all' | 'listened' | 'notListened'>('all');

  // Search field value
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  // Load songs from localStorage or set defaults
  useEffect(() => {
    const existingSongs = loadFromLocalStorage(LOCAL_STORAGE_KEY);

    if (!Array.isArray(existingSongs) || existingSongs.length === 0) {
      setSongs(initialSongs);
      saveToLocalStorage(LOCAL_STORAGE_KEY, initialSongs);
    } else {
      setSongs(existingSongs);
    }
  }, []);

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Add a new song to the list
  const handleAddSong = (newSong: Song) => {
    const updated = [...songs, newSong];
    setSongs(updated);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
  };

  // Edit song by ID
  const handleEditClick = (id: number) => {
    setEditingSongId(id);
  };

  // Toggle listened state
  const toggleListened = (id: number) => {
    const updated = songs.map((song) =>
      song.id === id ? { ...song, listened: !song.listened } : song
    );
    setSongs(updated);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
  };

  // Open/close delete confirmation
  const openDeleteDialog = (song: Song) => setSongToDelete(song);
  const cancelDelete = () => setSongToDelete(null);
  const confirmDelete = () => {
    if (!songToDelete) return;
    const updated = songs.filter((s) => s.id !== songToDelete.id);
    setSongs(updated);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
    setSongToDelete(null);
  };

  // Filter + search logic
  const filteredSongs = songs
    .filter((song) => {
      if (filter === "listened") return song.listened;
      if (filter === "notListened") return !song.listened;
      return true;
    })
    .filter((song) => {
      const term = searchTerm.toLowerCase();
      return (
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term)
      );
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="song-list-wrapper">
      <div className="song-app-container">
        <header className="header-section">
          <h1 className="main-title">🎵 Hello Songs App</h1>
        </header>

        <div className="search-filter-container">
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <section className="filter-section">
            <FilterButtons
              total={songs.length}
              listened={songs.filter((s) => s.listened).length}
              notListened={songs.filter((s) => !s.listened).length}
              activeFilter={filter}
              onFilterChange={setFilter}
            />
          </section>
        </div>

        <section className="form-section">
          <h2 className="section-title">Add a new song</h2>
          <SongForm onAdd={handleAddSong} />
          <p className="hint-text">✅ = listened / ❌ = not listened</p>
        </section>

        <section className="list-section">
          <ul className="song-list">
            {paginatedSongs.map((song) => (
              <li key={song.id} className="song-item"
                onClick={() => navigate(`/one-song/${song.id}`)}>
                {editingSongId === song.id ? (
                  <EditSongForm
                    song={song}
                    onSave={(updatedSong) => {
                      const updated = songs.map((s) =>
                        s.id === updatedSong.id ? updatedSong : s
                      );
                      setSongs(updated);
                      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
                      setEditingSongId(null);
                    }}
                    onCancel={() => setEditingSongId(null)}
                  />
                ) : (
                  <>
                    <span className="song-title">
                      {song.title} — {song.artist}
                      {/* <Link to={`/one-song/${song.id}`}>{song.title}</Link> — {song.artist} */}
                    </span>
                    <span className="song-status">{song.listened ? "✅" : "❌"}</span>

                    <div className="song-actions"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Tooltip title="Edit song">
                        <IconButton onClick={() => handleEditClick(song.id)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title={song.listened ? "Mark as unlistened" : "Mark as listened"}>
                        <IconButton
                          onClick={() => toggleListened(song.id)}
                          color={song.listened ? "success" : "default"}
                        >
                          {song.listened ? <VolumeUpIcon /> : <VolumeOffIcon />}
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete song">
                        <IconButton onClick={() => openDeleteDialog(song)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>

                    {/* Confirmation Dialog */}
                      <Dialog open={!!songToDelete} onClose={cancelDelete}>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogContent>
                          Do you really want to delete the song:{" "}
                          <strong>{songToDelete?.title}</strong>?
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={cancelDelete} color="primary">
                            Cancel
                          </Button>
                          <Button onClick={confirmDelete} color="error" autoFocus>
                            Delete
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        <div className="pagination-section">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
}

export default SongList;