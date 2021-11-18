
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/locking/navbar/navbar';
import Sidebar from './components/locking/navbar/sidebars';
import { NavigationBar } from './components/locking/navbar/NavigationBar';

import Index from './contaner/Index';
import Home from './contaner/Home';
import IndexWithout from './contaner/IndexWithout';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <Navbar />
            {/* <div style={{
              position: "fixed",
            }} > */}
            <Sidebar />
            {/* </div> */}
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            {/* <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li> */}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/without">
            <IndexWithout />
          </Route>
          <Route path="/locking">
            <Index />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

// function Home() {
//   return <h2>Home</h2>;
// }

// function About() {
//   return <h2>About</h2>;
// }

// function Users() {
//   return <h2>Users</h2>;
// }

export default App;
