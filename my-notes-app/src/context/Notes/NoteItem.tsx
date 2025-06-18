import type { Note } from './types';
import { format } from 'date-fns';
import { Button } from '../../components/UI/Button';

interface NoteItemProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteItem = ({ note, onEdit, onDelete }: NoteItemProps) => {
  return (
    <div className="note-card">
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="note-meta">
        <span>Создано: {format(new Date(note.createdAt), 'dd.MM.yyyy HH:mm')}</span>
        {note.updatedAt && (
          <span>Обновлено: {format(new Date(note.updatedAt), 'dd.MM.yyyy HH:mm')}</span>
        )}
      </div>
      <div className="note-actions">
        <Button onClick={() => onEdit(note)}>  {/* Передаём весь объект note */}
  Редактировать
</Button>
        <Button variant="danger" onClick={() => onDelete(note.id)}>
          Удалить
        </Button>
      </div>
    </div>
  );
};

export default NoteItem;