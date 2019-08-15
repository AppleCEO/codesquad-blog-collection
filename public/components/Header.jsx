import React from "react";
import styled from "styled-components";

const Div = styled.div`
  font-size: 2rem;
  border: 1px solid palevioletred;
`;

const Header = props => {
  return (
    <Div>
      <h1>코드스쿼드 해커톤</h1>
    </Div>
  );
};

export default Header;
