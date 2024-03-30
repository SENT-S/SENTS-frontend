import './assets/styles/styles.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Financials from './pages/financials';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/financials" element={<Financials />} />
      </Routes>
    </Router>
  );
};

export default App;
