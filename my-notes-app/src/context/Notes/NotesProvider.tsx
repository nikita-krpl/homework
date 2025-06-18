import { useState } from 'react';
import { NotesContext } from './NotesContext';
import type { ReactNode } from 'react';
import type { Note } from './types';
import { useAuth } from '../../hooks/useAuth'; // Импортируем хук аутентификации

export const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user } = useAuth(); // Получаем текущего пользователя

  const addNote = (title: string, content: string) => {
    if (!user) {
      throw new Error('User must be authenticated to create notes');
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      userId: user.id, // Добавляем обязательное поле
    };

    setNotes([...notes, newNote]);
  };

  const editNote = (id: string, title: string, content: string) => {
    setNotes(notes.map(note => 
      note.id === id 
        ? { ...note, title, content, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, editNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};