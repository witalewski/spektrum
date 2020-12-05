import React from "react";
// import FacebookLogin from "react-facebook-login";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const responseFacebook = (response:any) => {
    console.log(response);
  };
  return (
    <div className="App">
      {/* <FacebookLogin
        appId="1088597931155576"
        autoLoad={true}
        fields="name,email,picture"
        onClick={console.log}
        callback={responseFacebook}
      /> */}
    </div>
  );
};

export default App;
