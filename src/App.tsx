
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrdersOverview from './pages/OrdersOverview';
import UserManagement from './pages/UserManagement';

const App = () => {
  return (
    <Router>
      <Header />
          <Routes>
            <Route path="/" element={<OrdersOverview />} />
            <Route path='/users'  element={<UserManagement />} />
          </Routes>
    </Router>
  );
};

export default App;
