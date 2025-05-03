import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CountryPage from './pages/CountryPage';
import Landing from './pages/Landing';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white p-4 text-center">
          <h1 className="text-2xl font-bold">Countries Explorer</h1>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
          <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/country/:code" element={<CountryPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;