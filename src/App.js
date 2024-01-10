import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Appchoose from './components/Appchoose';
import QR from './components/QR';
import UTR from './components/UTR';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pay/:uid/:amount" element={<Appchoose />} />
        <Route path="/pay" element={<QR />} />
        <Route path="/utr" element={<UTR />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
