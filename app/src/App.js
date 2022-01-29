
import './App.css';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import AddUserForm from './pages/AddUserForm';
import SendMail from './pages/SendMail';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<AddUserForm />} />
          <Route path="/send-mail/:email" element={<SendMail />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
