import { Routes, Route} from 'react-router-dom';
import './App.css';
import AuthPage from './components/AuthPage';
import UsersTable from './components/UsersTable';
import ProtectedRoute from './components/ProtectedRoute';


function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      
        <Route path="users" element={<UsersTable/>}/>
      
      {/* Other routes */}
    </Routes>
    
  );
}

export default App;
