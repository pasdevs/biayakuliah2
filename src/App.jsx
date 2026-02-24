import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
import BiayaKuliah from './pages/BiayaKuliah';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/biaya/rincian-lengkap-v2" exact element={<BiayaKuliah />} />
        <Route path="*" element={<Navigate replace to="/biaya/rincian-lengkap-v2" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

