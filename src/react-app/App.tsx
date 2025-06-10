import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router';
import Editor from './Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/document/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const id = crypto.randomUUID();
    navigate(`/document/${id}`);
  }, [navigate]);

  return <div>Creating a new document...</div>;
}
