import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./app/Header";
import PageContainer from "./app/PageContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./app/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <PageContainer />
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
