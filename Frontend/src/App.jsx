import { useState } from "react";
import Navbar from "./Component/Navbar";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
