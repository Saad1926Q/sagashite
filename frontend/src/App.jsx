import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Results from './pages/Results';
import { Toaster } from "sonner";



function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/results' element={<Results/>}/>
    </Routes>
    <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
