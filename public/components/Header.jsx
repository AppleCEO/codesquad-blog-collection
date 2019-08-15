import React from "react";
import styled from "styled-components";

const Div = styled.div`
  font-size: 2rem;
  border: 1px solid palevioletred;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #333;
`;

const Header = ({ title }) => {
  return (
    <Div>
      <Title>{title}</Title>
    </Div>
  );
};
Header.defaultProps = {
  title: "코드스쿼드 해커톤",
};

export default Header;
