import { useState, useEffect } from 'react';
import type { Note } from './types';
import { Button } from '../../components/UI/Button'; // Именованный импорт
import styles from './NoteForm.module.css';

type NoteFormProps = {
  initialNote?: Note | null; // Разрешаем оба варианта
  onSubmit: (title: string, content: string) => void;
  onCancel?: () => void;
};

const NoteForm = ({ initialNote, onSubmit, onCancel }: NoteFormProps) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');

  useEffect(() => {
    setTitle(initialNote?.title || '');
    setContent(initialNote?.content || '');
  }, [initialNote]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
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
        maxLength={100}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Содержание заметки..."
        className={styles.textarea}
        required
        minLength={10}
        rows={5}
      />
      <div className={styles.buttons}>
        <Button type="submit" variant="primary">
          {initialNote ? 'Обновить' : 'Создать'}
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary">
            Отмена
          </Button>
        )}
      </div>
    </form>
  );
};

export default NoteForm;