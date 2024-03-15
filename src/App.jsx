import React from "react";
import "./style.css";
import YourComponent from "./index.jsx";
import { reload } from "./relode";

const App = () => {
  return (
    <div className="container">
      <h1 id="head" onClick={reload}>
        Serch image app
      </h1>

      <YourComponent />
    </div>
  );
};

export default App;
