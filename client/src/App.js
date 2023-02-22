import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Issues from './pages/Issues';
import PendingIssues from './pages/PendingIssues';
import CompletedIssues from './pages/CompletedIssues';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Notification from './pages/Notification';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/issues' element={<Issues/>} />
        <Route path='/pending' element={<PendingIssues/>} />
        <Route path='/completed' element={<CompletedIssues/>} />
        <Route path='/notifications' element={<Notification/>} />
      </Routes>
    </div>
  );
}

export default App;
