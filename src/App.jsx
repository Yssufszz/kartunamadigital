import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CardPage from './pages/CardViewer'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card" element={<CardPage />} />
    </Routes>
  );
}

export default App;
