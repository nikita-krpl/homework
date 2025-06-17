import { createContext, useContext, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  editNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
  searchNotes: (query: string) => Note[];
  filterNotesByDate: (date: Date) => Note[];
};

const NotesContext = createContext<NotesContextType | null>(null);

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notes', []);

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date(),
      userId: 'admin'
    };
    setNotes([...notes, newNote]);
  };

  const editNote = (id: string, title: string, content: string) => {
    setNotes(notes.map(note =>
      note.id === id
        ? {
          ...note,
          title,
          content,
          updatedAt: new Date()
        }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const searchNotes = (query: string) => {
    return notes.filter(
      note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterNotesByDate = (date: Date) => {
    return notes.filter(note =>
      new Date(note.createdAt).toDateString() === date.toDateString()
    );
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        editNote,
        deleteNote,
        searchNotes,
        filterNotesByDate
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) throw new Error('useNotes must be used within NotesProvider');
  return context;
};