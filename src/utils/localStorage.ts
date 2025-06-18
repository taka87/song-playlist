import { Song } from '../types/Song';

// const LOCAL_STORAGE_KEY = 'songs';

export function saveToLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export const loadFromLocalStorage = (key: string) => {
  try {
    const data = localStorage.getItem(key);
    const parsed = data ? JSON.parse(data) : [];
    return Array.isArray(parsed) ? parsed : []; // 👈 проверка за масив
  } catch (error) {
    console.error('Error parsing localStorage:', error);
    return [];
  }
};
// export function saveSongs(songs: Song[]) {
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(songs));
// }

// export function loadSongs(): Song[] {
//   const stored = localStorage.getItem(STORAGE_KEY);
//   return stored ? JSON.parse(stored) : [];
// }

// export {}; // ⬅️ това го прави модул