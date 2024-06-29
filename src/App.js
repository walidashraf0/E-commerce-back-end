import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Website/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
