import React from 'react';
import '../src/styles/main.css';
import Home from "./Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/home">Start page</Link>
                        </li>
                    </ul>
                </nav>


                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    </div>
  );
}

export default App;
