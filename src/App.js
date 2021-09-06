import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { useRoutes } from './routes';

function App() {
  const routes = useRoutes()
  return (
    <Router>
      <div className="App">
        {routes}
      </div>
    </Router>
  );
}

export default App;
