import React from "react";
import "./App.css";

const HelloWorld = () => {
  return (
    <div style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", marginTop: "20px" }}>
      Hello, Varshini!
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <HelloWorld />
    </div>
  );
}

export default App;
