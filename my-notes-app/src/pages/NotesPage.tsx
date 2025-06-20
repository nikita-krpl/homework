import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../context/Notes/useNotes';
import  NoteForm  from '../context/Notes/NoteForm';
import  NoteList  from '../context/Notes/NoteList';
import { Button } from '../components/UI/Button';
import styles from './NotesPage.module.css';
import type { Note } from '../context/Notes/types';

export const NotesPage = () => {
  const { logout, user } = useAuth(); // Добавляем user из useAuth
  const { notes, addNote, editNote, deleteNote } = useNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (title: string, content: string) => {
    if (editingNote && editingNote.id) {
      editNote(editingNote.id, title, content);
    } else {
      addNote(title, content); // Теперь передаем 2 аргумента
    }
    setEditingNote(null);
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Мои заметки</h1>
        <div className={styles.controls}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            className={styles.searchInput}
          />
          <Button variant="secondary" onClick={logout}>
            Выйти
          </Button>
        </div>
      </header>

      {editingNote !== null ? (
        <NoteForm
          initialNote={editingNote}
          onSubmit={handleSubmit}
          onCancel={() => setEditingNote(null)}
        />
      ) : (
        <Button 
          variant="primary" 
          onClick={() => setEditingNote({ 
            id: '', // Оставляем пустым для новой заметки
            title: '', 
            content: '', 
            createdAt: new Date(),
            userId: user?.id || 'default-user-id'
          })}
          className={styles.addButton}
        >
          Создать новую заметку
        </Button>
      )}
          

      {filteredNotes.length > 0 ? (
        <NoteList 
          notes={filteredNotes}
          onEdit={handleEdit}
          onDelete={deleteNote}
        />
      ) : (
        <div className={styles.emptyState}>
          {notes.length === 0 
            ? 'У вас пока нет заметок. Создайте первую!' 
            : 'Заметки по вашему запросу не найдены'}
        </div>
      )}
    </div>
  );
};