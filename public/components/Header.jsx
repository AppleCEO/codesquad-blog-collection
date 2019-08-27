import React from "react";
import styled from "styled-components";

const Wrapper = styled.h1`
  font-size: 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #3f51b5;

  a {
    font-size: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #fff;
    padding-left: 2rem;
    padding-right: 2rem;
    text-decoration: none;
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <a href="/">LINKSQUAD</a>
    </Wrapper>
  );
};

export default Header;
