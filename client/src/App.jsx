import React from "react";
import Home from "./pages/Home";
import Travel from "./pages/Travel";
import { Route, Routes } from "react-router-dom";
import TripDetails from "./pages/TripDetails";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/Trip"} element={<Travel />} />
        <Route path={"/trip-detail"} element={<TripDetails />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="custom-toast"
      />
    </>
  );
};

export default App;
