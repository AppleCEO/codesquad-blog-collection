import React from "react";
import styled from "styled-components";

const Div = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  background-color: #3f51b5;
  height: 60px;
  box-sizing: border-box;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Footer = props => {
  return <Div>© 2019 CodeSquad Team 2</Div>;
};

export default Footer;
