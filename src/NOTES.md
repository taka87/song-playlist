import React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// material icons(button)
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';


import { Song } from "../types/Song";
import SongForm from '../components/SongForm';

// !!
import { saveToLocalStorage, loadFromLocalStorage } from "../utils/localStorage";
import { EditSongForm } from "../components/EditSongForm";
import FilterButtons from "../components/FilterButtons";
import Pagination from '@mui/material/Pagination';

const LOCAL_STORAGE_KEY = 'songs';

function SongList() {
  const [songs, setSongs] = useState<Song[]>([]);

  // editForm pattern
  const [editingSongId, setEditingSongId] = useState<number | null>(null);

  //delete song
  const [songToDelete, setSongToDelete] = useState<Song | null>(null);

  //listened/not listened music
  // const totalSongs = songs.length;
  // const listenedSongs = songs.filter((song) => song.listened).length;
  // const notListenedSongs = songs.filter((song) => !song.listened).length;
  const [filter, setFilter] = useState<'all' | 'listened' | 'notListened'>('all');

    //search in list
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredSongs = songs
    .filter((song) => {
      if (filter === 'listened') return song.listened;
      if (filter === 'notListened') return !song.listened;
      return true;
    })
    .filter((song) => {
      const term = searchTerm.toLowerCase();
      return (
        song.title.toLowerCase().includes(term) ||
        song.artist.toLowerCase().includes(term)
      );
    });



  // pagination
  // const [filter, setFilter] = useState<'all' | 'listened' | 'notListened'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const existingSongs = loadFromLocalStorage('songs');

    if (!Array.isArray(existingSongs) || existingSongs.length === 0) {
      const songs = [
        { id: 1, title: 'Imagine', artist: 'John Lennon', listened: true },
        { id: 2, title: 'Bohemian Rhapsody', artist: 'Queen', listened: false },
      ];
        setSongs(songs);
        saveToLocalStorage(LOCAL_STORAGE_KEY, songs);
      } else {
        // 🔥 ЕТО Я ЛИПСВАЩАТА ЧАСТ:
        setSongs(existingSongs);
      }
  }, []);

  const handleAddSong = (newSong: Song) => {
    setSongs((prev) => {
      const updated = [...prev, newSong];
      saveToLocalStorage(LOCAL_STORAGE_KEY, updated);
      return updated;
    });
  };

  //set filter to current page 1 for example
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // EditSong by id
  const handleEditClick = (id: number) => {
    setEditingSongId(id); // ✅ вече имаш editingSongId от useState
  };

  // handle toggle listened
  const toggleListened = (id: number) => {
    const updatedSongs = songs.map((song) =>
      song.id === id ? { ...song, listened: !song.listened } : song
    );
    setSongs(updatedSongs);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedSongs);
  };

  // delete logyc with material
  const openDeleteDialog = (song: Song) => {
    setSongToDelete(song);
  };

  const confirmDelete = () => {
    if (!songToDelete) return;
    const updatedSongs = songs.filter(s => s.id !== songToDelete.id);
    setSongs(updatedSongs);
    saveToLocalStorage(LOCAL_STORAGE_KEY, updatedSongs);
    setSongToDelete(null); // затвори диалога
  };

  const cancelDelete = () => {
    setSongToDelete(null); // само затваря
  };

  // pagination
  // const filteredSongs = songs.filter((song) => {
  //   if (filter === 'listened') return song.listened;
  //   if (filter === 'notListened') return !song.listened;
  //   return true;
  // });

  const totalPages = Math.ceil(filteredSongs.length / itemsPerPage);

  const paginatedSongs = filteredSongs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const handleDelete = (id: number) => {
  //   const updatedSongs = songs.filter(song => song.id !== id);
  //   setSongs(updatedSongs);
  //   saveToLocalStorage(LOCAL_STORAGE_KEY, updatedSongs);
  // };

  return (
    <div>
      <div>
        <h1>Hello Songs App 🎵</h1>
      </div>

      {/* listened/not listened part */}
      <FilterButtons
        total={songs.length}
        listened={songs.filter((s) => s.listened).length}
        notListened={songs.filter((s) => !s.listened).length}
        activeFilter={filter}
        onFilterChange={setFilter}
      />

      <SongForm onAdd={handleAddSong} />

      <ul>
        {paginatedSongs.map((song) => (
          <li key={song.id}>
            {editingSongId === song.id ? (
              <EditSongForm
                song={song}
                onSave={(updatedSong) => {
                  const updatedSongs = songs.map((s) =>
                    s.id === updatedSong.id ? updatedSong : s
                  );
                  setSongs(updatedSongs);
                  saveToLocalStorage(LOCAL_STORAGE_KEY, updatedSongs);
                  setEditingSongId(null);
                }}
                onCancel={() => setEditingSongId(null)}
              />
            ) : (
              <>
                <Link to={`/one-song/${song.id}`}>{song.title}</Link> — {song.artist} —{' '}
                {song.listened ? '✅' : '❌'}

                {/* material icons(button) */}
                <Tooltip title="Edit song">
                  <IconButton onClick={() => handleEditClick(song.id)} color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Tooltip>        

                <Tooltip title={song.listened ? "Mark as unlistened" : "Mark as listened"}>
                  <IconButton onClick={() => toggleListened(song.id)} color={song.listened ? "success" : "default"} aria-label="toggle-listened">
                    {song.listened ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  </IconButton>
                </Tooltip>

                {/* delete button tooltip with material popup */}
                <Tooltip title="Delete song">
                  <IconButton onClick={() => openDeleteDialog(song)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>

                <Dialog open={!!songToDelete} onClose={cancelDelete}>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogContent>
                    Do you really want to delete the song: <strong>{songToDelete?.title}</strong>?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={cancelDelete} color="primary">Cancel</Button>
                    <Button onClick={confirmDelete} color="error" autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>

              </>
            )}
          </li>
        ))}
      </ul>   
      {/* филтър инпут-а трябва да го направим да обозначава какво как филтрира по красив начин    */}
        <input
          type="text"
          placeholder="Search by title or artist..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
        />
        
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
        />
    </div>
  );
}

export default SongList;