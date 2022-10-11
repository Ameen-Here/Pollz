import "./App.css";
import Header from "./components/header/Header";
import MainSection from "./components/main-section/MainSection";

import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:3001");

function App() {
  return (
    <div className="app">
      <Header />
      <MainSection />
    </div>
  );
}

export default App;
