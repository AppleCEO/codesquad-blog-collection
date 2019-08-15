import React from "react";
import { Normalize } from "styled-normalize";
import styled, { createGlobalStyle, ThemeProvider, css } from "styled-components";
import Container from "@material-ui/core/Container";
import Main from "./main/Main.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.fontFamily};
  }
 
`;

const App = () => {
  return (
    <ThemeProvider theme={{ fontFamily: `"SFCompactDisplay", "SFCompactText", "sans-serif"` }}>
      <>
        <Normalize />
        <Container>
          <Header />
          <Main />
          <Footer />
        </Container>
      </>
    </ThemeProvider>
  );
};

export default App;
