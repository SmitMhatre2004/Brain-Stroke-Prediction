import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Programs from "./Components/Programs/Programs";
import About from "./Components/About/About";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Prediction from "./Components/Predictions/Prediction";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Hero />
        <div className="container">
          <Programs />
          <About />
          <Prediction />
          <Contact />

          <Footer />
        </div>
      </div>
    ),
  },
  {
    path: "predictions",
    element: <Prediction />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
    // <div>
    //   <Navbar />
    //   <Hero />
    //   <div className="container">
    //     <Programs />
    //     <About />
    //     <Contact />
    //     <Prediction />
    //     <Footer />
    //   </div>
    // </div>
  );
};

export default App;
