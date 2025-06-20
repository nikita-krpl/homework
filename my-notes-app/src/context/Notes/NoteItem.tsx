import  {Button} from '../../components/UI/Button';
import styles from './NoteItem.module.css';
import type { Note } from './types';

type NoteItemProps = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

export const NoteItem = ({ note, onEdit, onDelete }: NoteItemProps) => {
  return (
    <div className={styles.noteCard}>
      <h3 className={styles.noteHeader}>{note.title}</h3>
      <div className={styles.noteMeta}>
        <span>Создано: {new Date(note.createdAt).toLocaleDateString()}</span>
        {note.updatedAt && (
          <span>Обновлено: {new Date(note.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
      <p className={styles.noteContent}>{note.content}</p>
      <div className={styles.noteActions}>
        <Button 
          variant="primary" 
          onClick={() => onEdit(note)}
          size="small"
        >
          Редактировать
        </Button>
        <Button 
          variant="danger" 
          onClick={() => onDelete(note.id)}
          size="small"
        >
          Удалить
        </Button>
      </div>
    </div>
  );
};