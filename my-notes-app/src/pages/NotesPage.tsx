import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import NoteList from '../components/Notes/NoteList';
import NoteForm from '../components/Notes/NoteForm';
import SearchNotes from '../components/Notes/SearchNotes';
import Button from '../components/UI/Button';

const NotesPage = () => {
  const { logout } = useAuth();
  const { notes, addNote, editNote, deleteNote, searchNotes, filterNotesByDate } = useNotes();
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [displayedNotes, setDisplayedNotes] = useState<Note[]>(notes);
  const [showForm, setShowForm] = useState(false);

  const handleSearch = (query: string) => {
    setDisplayedNotes(searchNotes(query));
  };

  const handleFilter = (date: Date) => {
    setDisplayedNotes(filterNotesByDate(date));
  };

  const handleEdit = (note: Note) => {
    setCurrentNote(note);
    setShowForm(true);
  };

  const handleSubmit = (title: string, content: string) => {
    if (currentNote) {
      editNote(currentNote.id, title, content);
    } else {
      addNote(title, content);
    }
    setCurrentNote(null);
    setShowForm(false);
  };

  useEffect(() => {
    setDisplayedNotes(notes);
  }, [notes]);

  return (
    <div className="notes-page">
      <header>
        <h1>Мои заметки</h1>
        <Button onClick={logout}>Выйти</Button>
      </header>

      <SearchNotes onSearch={handleSearch} onFilter={handleFilter} />

      {showForm ? (
        <NoteForm 
          initialNote={currentNote} 
          onSubmit={handleSubmit} 
          onCancel={() => {
            setCurrentNote(null);
            setShowForm(false);
          }}
        />
      ) : (
        <Button onClick={() => setShowForm(true)}>
          Создать новую заметку
        </Button>
      )}

      <NoteList 
        notes={displayedNotes} 
        onEdit={handleEdit} 
        onDelete={deleteNote} 
      />
    </div>
  );
};

export default NotesPage;