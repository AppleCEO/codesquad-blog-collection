import React from "react";
import { Normalize } from "styled-normalize";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import Main from "./main/Main.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const App = () => {
  return (
    <>
      <Normalize />
      <Container>
        <Header />
        <Main />
        <Footer />
      </Container>
    </>
  );
};

export default App;
