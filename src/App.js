import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";
import Chat from "./pages/Chat";
import Login from "./pages/Login";


function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Chat}/>
      <Route path="/login" component={Login}/>
    </BrowserRouter>
  );
}

export default App;
