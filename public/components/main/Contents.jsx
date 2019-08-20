import React from "react";
import styled from "styled-components";
import Item from "./Item.jsx";

const Div = styled.div`
  min-height: 29rem;
`;

const Ul = styled.ul`
  margin: 0;
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
`;

const Contents = ({ data }) => {
  return (
    <Div>
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
    </Div>
  );
};

export default Contents;
