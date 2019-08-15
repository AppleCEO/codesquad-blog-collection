import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";

const Div = styled.div`
  font-size: 2rem;
`;
const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px"
  }
});

const Category = ({ data, onClick }) => {
  const [selected, setSelected] = React.useState(false);

  const classes = useStyles();

  return (
    <Div>
      <h2>Category</h2>
      {data.map(v => (
        <Button
          // className={classes.root}
          onClick={onClick}
          value={v}
          key={v}
          variant="outlined"
          color="primary"
          size="large"
        >
          {v}
        </Button>
      ))}
    </Div>
  );
};

export default Category;
