import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/main.css'; // Shared styles

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-page">
      <h1>Jacobite Chords</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song (e.g. 'Moran Etho')"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchPage;