// NoteList.types.ts
import type { Note } from '../../context/Notes/types';

export interface NoteListProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
  searchQuery?: string; // если нужно
}

