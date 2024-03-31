import './assets/styles/styles.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Financials from './pages/financials';
import New from './pages/new';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/financials" element={<Financials />} />
        <Route path="/graph" element={<New />} />
      </Routes>
    </Router>
  );
};

export default App;
