import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import "./styles.scss";

function App() {
  return ( <div className="app">
          <BrowserRouter>
                  <Route exact path="/" component={Chat}/>
                  <Route path="/login" component={Login}/>
          </BrowserRouter>
        </div>);
}

export default App;
