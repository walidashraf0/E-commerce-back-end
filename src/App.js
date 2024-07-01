import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/Website/HomePage';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Users from './Pages/Dashboard/Users';
import GoogleCallBack from './Pages/Auth/GoogleCallBack';
import Dashboard from './Pages/Dashboard/Dashboard';
// import TopBar from './Components/Dashboard/TopBar';
// import SideBar from './Components/Dashboard/SideBar';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Public Routes  */}
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/users' element={<Users />} />
        <Route path='/auth/google/callback' element={<GoogleCallBack />} />
        {/* Protected Routes  */}
        <Route path='/dashboard' element={<Dashboard />}>
            <Route path='users' element={<Users />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
