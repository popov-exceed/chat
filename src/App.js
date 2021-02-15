import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import "./styles.scss";

function App() {
  return ( <div className="app">
          <HashRouter basename="/">
                  <Route exact path="/" component={Chat}/>
                  <Route path="/login" component={Login}/>
          </HashRouter>
        </div>);
}

export default App;
