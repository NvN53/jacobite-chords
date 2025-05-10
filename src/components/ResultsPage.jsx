import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/main.css';

// Mock database (replace with real API calls later)
const SONGS = [
  { id: 1, filename: 'twinkle.pro', title: 'Twinkle Twinkle Little Star', category: 'General' },
  { id: 2, filename: 'velivu.pro', title: 'Velivu Niranjoreesho', category: 'Holy Qurbana' },
  { id: 3, filename: 'shlomo.pro', title: 'Shlomo', category: 'Hymns' },
];

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchTerm = new URLSearchParams(location.search).get('q') || '';
    const filtered = SONGS.filter(song =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  }, [location.search]);

  return (
    <div className="results-page">
      <h2>Search Results</h2>
      {results.length === 0 ? (
        <p>No songs found. Try another search.</p>
      ) : (
        <ul className="song-list">
          {results.map((song) => (
            <li 
              key={song.id}
              style={{ display: 'flex', gap: '12px' }}
              onClick={() => navigate(`/song/${song.filename}`)}
            >
              <span className="song-title">{song.title}</span>
              <span style={{ marginLeft: '10px' }} className="song-category">{song.category}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResultsPage;