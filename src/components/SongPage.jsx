import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as chordsheetjs from 'chordsheetjs';
import '../styles/main.css';

const SongPage = () => {
  const { filename } = useParams();
  const [songHtml, setSongHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadSong = async () => {
      try {
        setIsLoading(true);
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

  if (isLoading) return <div>Loading song...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="song-page">
      {songHtml && (
        <div dangerouslySetInnerHTML={{ __html: songHtml }} />
      )}
    </div>
  );
};

export default SongPage;