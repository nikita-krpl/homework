import { useState, useEffect } from 'react';
import { Note } from '../../types/types';
import Button from '../UI/Button';

type NoteFormProps = {
  initialNote?: Note;
  onSubmit: (title: string, content: string) => void;
};

const NoteForm = ({ initialNote, onSubmit }: NoteFormProps) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Содержание"
        required
      />
      <Button type="submit">
        {initialNote ? 'Обновить' : 'Создать'}
      </Button>
    </form>
  );
};

export default NoteForm;