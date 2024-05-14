import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Offers from './pages/Offers'; 

function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/offers" element={<Offers />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
