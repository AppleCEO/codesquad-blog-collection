import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Div = styled.div`
  box-sizg: border-box;
  padding: 2rem;
  font-size: 2rem;

  .active {
    background: #3f51b5;
    color: white;
  }
`;

const Category = ({ data, onClick }) => {
  const [selected, setSelected] = React.useState({ all: true });

  const handleClick = ({ target }) => {
    onClick({ target });
    setSelected({ [target.id]: true });
  };

  return (
    <Div>
      {data.map(v => (
        <Button
          className={selected[v] ? "active" : ""}
          onClick={handleClick}
          id={v}
          value={v}
          key={v}
          variant="outlined"
          color="primary"
          size="large"
        >
          <span id={v}>{v}</span>
        </Button>
      ))}
    </Div>
  );
};

export default Category;
