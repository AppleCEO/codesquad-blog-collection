import React from "react";
import styled from "styled-components";
import Item from "./Item.jsx";

const Ul = styled.ul`
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const Contents = ({ data }) => {
  return (
    <>
      <h2>Lists</h2>
      <Ul>
        {data.map(v => (
          <Item key={v._id} data-id={v._id} url={v.url} title={v.title} desc={v.description} />
        ))}
      </Ul>
    </>
  );
};

export default Contents;
