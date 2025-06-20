// NotesContext.tsx
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type {Note}  from './types';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      createdAt: new Date(),
      userId: 'current-user-id' // Замените на реальный ID пользователя
    };
    setNotes(prev => [...prev, newNote]);
  };

  const editNote = (id: string, title: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id 
        ? { ...note, title, content, updatedAt: new Date() }
        : note
    ));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return { notes, addNote, editNote, deleteNote };
};