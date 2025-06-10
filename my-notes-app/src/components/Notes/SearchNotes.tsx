import { useState } from 'react';
import Button from '../UI/Button';

type SearchNotesProps = {
  onSearch: (query: string) => void;
  onFilter: (date: Date) => void;
};

const SearchNotes = ({ onSearch, onFilter }: SearchNotesProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleFilter = () => {
    if (filterDate) {
      onFilter(new Date(filterDate));
    }
  };

  return (
    <div className="search-notes">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по заметкам..."
      />
      <Button onClick={handleSearch}>Поиск</Button>
      
      <input
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <Button onClick={handleFilter}>Фильтр по дате</Button>
    </div>
  );
};

export default SearchNotes;