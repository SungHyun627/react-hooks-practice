import { useContext } from 'react';
import Ingredients from './Ingredients/Ingredients';
import Auth from './Auth.js';
import { AuthContext } from './context/auth-context';

const App = (props) => {
  const authContext = useContext(AuthContext);
  let content = authContext.isAuth ? <Ingredients /> : <Auth />;
  return content;
};

export default App;
