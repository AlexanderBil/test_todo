import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

type Props = { children: React.JSX.Element };

const RequireAuth: React.FC<Props> = ({ children }) => {

  const {user} = useAuth()
  // const user = localStorage.getItem('user');

  if (!user) {
    return <Navigate to="/login"></Navigate>;
  }
  return children;
};

export { RequireAuth };
