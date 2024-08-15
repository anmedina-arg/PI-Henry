import './App.css';
import {Route, Routes} from "react-router-dom"
import Landing from './components/landing';
import NavBar from './components/navBar';
import CountryDetail from './components/countryDetail';
import AddActivity from './components/addActivity';
import Home from './components/home';

import axios from 'axios';

axios.defaults.baseURL = 'https://pi-henry-cujj.onrender.com/api'


function App() {
  return (
    <div className="App">
       <Routes >
          <Route exact path="/" element={<Landing />} />
          <Route path="/" element={<NavBar />}>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/addactivity" element={<AddActivity/>} />
            <Route exact path="/country/:name" element={<CountryDetail />} />
          </Route>
       </Routes>
    </div>
  );
}

export default App;
