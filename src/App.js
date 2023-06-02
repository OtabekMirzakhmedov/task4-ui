import { Routes, Route} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UsersTable from './components/UsersTable';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';


function App() {

  return (
    <AuthProvider>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <UsersTable />
          </ProtectedRoute>}
      />
    </Routes>
    </AuthProvider>
  );
}

export default App;
