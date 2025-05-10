import React, { useEffect, useState } from 'react';
import * as chordsheetjs from 'chordsheetjs';

const SongViewer = () => {
  const [formattedSong, setFormattedSong] = useState('');
  const [songTitle, setSongTitle] = useState('Search for a song');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const songs = [
    { filename: 'twinkle.pro', displayName: 'Twinkle Twinkle Little Star' },
    // Add more songs here
  ];

  useEffect(() => {
    setFilteredSongs(
      songs.filter(song =>
        song.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  const loadSong = async (filename) => {
    try {
      setIsLoading(true);
      setFormattedSong('');
      setSongTitle('Loading...');

      const response = await fetch(`/${filename}`);
      if (!response.ok) throw new Error('Song not found');
      const data = await response.text();

      const parser = new chordsheetjs.ChordProParser();
      const song = parser.parse(data);
      const formatter = new chordsheetjs.HtmlTableFormatter();

      setSongTitle(song.title);
      setFormattedSong(formatter.format(song));
    } catch (err) {
      console.error('Error:', err);
      setSongTitle(`Error: ${err.message}`);
      setFormattedSong('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Jacobite Chords Viewer</h1>
      
      <input
        type="text"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '100%',
          fontSize: '16px',
          marginBottom: '20px'
        }}
      />
      
      {isLoading && <p>Loading song...</p>}
      
      <div style={{ marginBottom: '20px' }}>
        {filteredSongs.map((song) => (
          <div
            key={song.filename}
            onClick={() => loadSong(song.filename)}
            style={{
              padding: '10px',
              margin: '5px 0',
              backgroundColor: '#f0f0f0',
              borderRadius: '5px',
              cursor: 'pointer',
              ':hover': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            {song.displayName}
          </div>
        ))}
      </div>

      {songTitle.startsWith('Error:') ? (
        <p style={{ color: 'red' }}>{songTitle}</p>
      ) : (
        formattedSong && (
          <div>
            <h2>{songTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: formattedSong }} />
          </div>
        )
      )}
    </div>
  );
};

export default SongViewer;