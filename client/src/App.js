import Routers from './routes';
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/auth'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routers/>
      </BrowserRouter> 
    </AuthProvider> 
  );
  }

export default App;
