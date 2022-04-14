import { Link, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import About from './pages/about';
import Gallery from './pages/Gallery';
import Keranjang from './pages/Keranjang';
import Event from './pages/Event';
import Pegawai from './pages/pegawai';
import './App.css';

function App() {
  return (
    <div className="flex justify-center p-6 w-screen h-screen bg-gray-400 overflow-y-auto">
      <div className="w-full">
        <div className="flex items-center justify-center mb-4 text-xs text-gray-700 font-semibold uppercase tracking-wide">
          <Link
            className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
            to="/home">
            Home
          </Link>
          <Link
            className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
            to="/about">
            About
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
            to="/Gallery">
            Gallery
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
            to="/Keranjang">
            Keranjang
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
            to="/Event">
            Event
          </Link>
          <Link className="mx-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all ease-in-out"
            to="/Pegawai">
            Pegawai
          </Link>
        </div>

        <div className="p-10 w-full bg-white rounded-xl shadow-lg">
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/Gallery" element={<Gallery />}></Route>
            <Route path="/Keranjang" element={<Keranjang />}></Route>
            <Route path="/Event" element={<Event />}></Route>
            <Route path="/Pegawai" element={<Pegawai />}></Route>
          </Routes>
        </div>
      </div>
    </div>

  )
}

export default App;
