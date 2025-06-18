import { createContext } from 'react';
import type { Note } from './types';

type NotesContextType = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
  editNote: (id: string, title: string, content: string) => void;
  deleteNote: (id: string) => void;
};

export const NotesContext = createContext<NotesContextType | null>(null);