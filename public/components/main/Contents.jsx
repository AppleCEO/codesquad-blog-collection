import React from "react";
import styled from "styled-components";
import Item from "./Item.jsx";

const Ul = styled.ul`
  margin: 0;
  padding: 0 2rem;
`;

const Contents = ({ data }) => {
  return (
    <>
      <h2>Lists</h2>
      <Ul>
        {data.map(v => (
          <Item
            key={v._id}
            data-id={v._id}
            url={v.url}
            title={v.title}
            desc={v.description}
            metadata={v.metadata && JSON.parse(v.metadata)}
          />
        ))}
      </Ul>
    </>
  );
};

export default Contents;
