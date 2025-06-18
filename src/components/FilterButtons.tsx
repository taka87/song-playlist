import React from 'react';

type Props = {
  total: number;
  listened: number;
  notListened: number;
  activeFilter: 'all' | 'listened' | 'notListened';
  onFilterChange: (filter: 'all' | 'listened' | 'notListened') => void;
};

const FilterButtons = ({ total, listened, notListened, activeFilter, onFilterChange }: Props) => {
  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
      <span
        style={{ cursor: 'pointer', fontWeight: activeFilter === 'all' ? 'bold' : 'normal' }}
        onClick={() => onFilterChange('all')}
      >
        🎵 Total: {total}
      </span>
      <span
        style={{ cursor: 'pointer', fontWeight: activeFilter === 'listened' ? 'bold' : 'normal' }}
        onClick={() => onFilterChange('listened')}
      >
        ✅ Listened: {listened}
      </span>
      <span
        style={{ cursor: 'pointer', fontWeight: activeFilter === 'notListened' ? 'bold' : 'normal' }}
        onClick={() => onFilterChange('notListened')}
      >
        ❌ Not Listened: {notListened}
      </span>
    </div>
  );
};

export default FilterButtons;