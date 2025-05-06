import React from "react";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/Trip"} element={<Travel />} />
    </Routes>
  );
};

export default App;
