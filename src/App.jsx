import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/HomePageTest';
import Loginpage from './Components/Loginpage';
import FormComponent from './Components/FormComponent';
import SuperAdminPage from './Components/SuperAdmin';
function App() {
  return (
    <>
     <Router>
     <Routes>
        <Route path="/marvel" element={<Loginpage />} />
        <Route path="/marvel/home" element={<Homepage />} />
        <Route path="/marvel/superadmin" element={<SuperAdminPage />} />
        <Route path="/marvel/form" element={<FormComponent />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;