import React from "react";
import styled from "styled-components";

const StyledLi = styled.li`
  margin: 0 1rem;
  padding: 0.25rem 1rem;
  width: 20rem;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  color: palevioletred;
`;
const Desc = styled.div`
  font-size: 1rem;
`;

const Item = ({ title, desc, ...restProps }) => {
  return (
    <StyledLi {...restProps}>
      <Title>{title}</Title>
      <Desc>{desc}</Desc>
    </StyledLi>
  );
};

export default Item;
