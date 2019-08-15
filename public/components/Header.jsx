import React from "react";
import styled from "styled-components";

const Div = styled.div`
  font-size: 2rem;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #3f51b5;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  padding-left: 2rem;
  padding-right: 2rem;
`;

const Header = ({ title }) => {
  return (
    <Div>
      <Title>{title}</Title>
    </Div>
  );
};
Header.defaultProps = {
  title: "Blog Collection :D",
};

export default Header;
