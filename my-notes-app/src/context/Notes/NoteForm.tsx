import { useState, useEffect } from 'react';
import type { Note } from './types';
import {Button} from '../../components/UI/Button';
import styles from './NoteForm.module.css';

type NoteFormProps = {
  initialNote?: Note | null;
  onSubmit: (title: string, content: string) => void;
  onCancel: () => void;
};

const NoteForm = ({ initialNote, onSubmit, onCancel }: NoteFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Автоматическая синхронизация при изменении editingNote
  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
  }, [initialNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, content);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        className={styles.input}
        required
        minLength={3}
      />
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Текст заметки"
        className={styles.textarea}
        required
        minLength={10}
        rows={5}
      />
      
      <div className={styles.buttons}>
        <Button type="submit" variant="primary">
          {initialNote ? 'Сохранить' : 'Добавить'}
        </Button>
        <Button 
          type="button" 
          onClick={onCancel}
          variant="secondary"
        >
          Отмена
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;