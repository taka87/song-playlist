import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SongList from './pages/SongList';
import SongItem from './pages/SongItem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SongList />} />
      <Route path="/one-song/:id" element={<SongItem />} />
    </Routes>
  );
}

export default App;
