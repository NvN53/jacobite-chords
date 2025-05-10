import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import ResultsPage from './components/ResultsPage';
import SongPage from './components/SongPage';
import './styles/main.css';  // Shared styles

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />          // Default page
        <Route path="/results" element={<ResultsPage />} />  // Search results
        <Route path="/song/:filename" element={<SongPage />} />  // Individual song
      </Routes>
    </BrowserRouter>
  );
}

export default App;