import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from "./Signup"
import GuestTaskPage from './GuestTaskPage'
import TaskPage from './TaskPage'
import AuthenticatedUserProfile from './AuthenticatedUserProfile'
import Login from './Login'

function App() {
  return (
    <Router>
      <div className="App">
            <Switch>
              <Route exact path="/"><GuestTaskPage /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/taskpage"><TaskPage /></Route>
              <Route path="/signup"><Signup /></Route>
              <Route path="/AuthenticatedUserProfile"><AuthenticatedUserProfile /></Route>
              <Route path="/login"><Login /></Route>
            </Switch>
      </div>
    </Router>
  );
}

export default App;
