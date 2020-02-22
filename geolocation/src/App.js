import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
const NavBar = () => (
  <div className="navbar">
    <h3>Geo Location</h3>
  </div>
);
const geoSuccess=() =>{
  navigator.geolocation.getCurrentPosition(function(position){
    document.getElementsByClassName("page-info")[0].innerText=`lat=${position.coords.latitude} long=${position.coords.longitude}`;
  });
}

const Template = (props) => {
  geoSuccess();
  return (<div>
    <NavBar />
    <p className="page-info">
      {props.title}
    </p>
  </div>
  ) 
  };

const CurrentTasks = () => (
  <Template title="Current Tasks" status="Current"/>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/geolocation/" component={CurrentTasks}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;