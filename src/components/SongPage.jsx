import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as chordsheetjs from 'chordsheetjs';
import '../styles/main.css';

const SongPage = () => {
  const { filename } = useParams();
  const navigate = useNavigate();
  const [songHtml, setSongHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSong = async () => {
      try {
        const response = await fetch(`/songs/${filename}`);
        if (!response.ok) throw new Error('Song not found');
        const text = await response.text();
        
        const parser = new chordsheetjs.ChordProParser();
        const song = parser.parse(text);
        const formatter = new chordsheetjs.HtmlTableFormatter();
        
        setSongHtml(formatter.format(song));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadSong();
  }, [filename]);

  if (isLoading) return <div className="loading">Loading song...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="song-page">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to results
      </button>
      <div dangerouslySetInnerHTML={{ __html: songHtml }} />
    </div>
  );
};

export default SongPage;