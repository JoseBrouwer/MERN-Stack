import React from 'react';
import { Container } from "react-bootstrap";
import { Outlet } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";


const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer/>
      <ToastContainer />
    </>
  );
};

export default App;