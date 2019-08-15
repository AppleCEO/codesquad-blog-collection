import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Pagination = props => {
  //TODO: pages배열 props에서 받아서 만들기
  const pages = ["<", 1, 2, 3, 4, 5, ">"];

  return (
    <ButtonGroup size="small" aria-label="small outlined button group">
      {pages.map(v => (
        <Button onClick={props.onClick} key={v} value={v}>
          {v}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Pagination;
