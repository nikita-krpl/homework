// NoteList.tsx
import { useState } from 'react';
import type { NoteListProps } from './NoteList.types';
import NoteItem from '../Notes/NoteItem';
import styles from './NoteList.module.css';


const NoteList = ({ notes, onEdit, onDelete }: NoteListProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Поиск по заметкам..."
          className={styles.searchInput}
          aria-label="Поиск заметок"
        />
      </div>

      {filteredNotes.length === 0 ? (
        <div className={styles.emptyState}>
          {notes.length === 0 ? 'Заметок пока нет' : 'Ничего не найдено'}
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredNotes.map(note => (
            <li key={note.id} className={styles.listItem}>
              <NoteItem
                note={note}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NoteList;