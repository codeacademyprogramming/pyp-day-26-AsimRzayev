import React from "react";
import "./App.css";
import Room from "./modules/Rooms/index";
import ReservationsList from "./modules/Rooms/ReservationsList";
import {  Switch, Route } from "react-router-dom";


function App() {
    
    return (
 
        <div className="App">
            
              
            <Switch>

          <Route path="/reservations/:id" component={ReservationsList}/> 
          
          <Route exact path="/" component={Room} />
         
        </Switch>                   
   
        </div>
   
    );
}

export default App;
