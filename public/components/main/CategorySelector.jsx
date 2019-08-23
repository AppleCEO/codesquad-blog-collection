import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  select {
    display: block;
    color: gray;
    font-family: inherit;
    font-size: 100%;
    width: 100%;
    border: 1px solid #dae1e7;
    background: url(https://img.icons8.com/metro/26/000000/expand-arrow.png) no-repeat 95% 50%/5%;
    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    padding: 0.5rem 0.75rem;
    -webkit-appearance: none;
    appearance: none;
  }
  select::-ms-expand {
    display: none;
  }
`;
const CategorySelector = ({ value, onChange }) => {
  return (
    <Wrapper>
      <select name="category" value={value} onChange={onChange}>
        <option value="">카테고리</option>
        <option value="backend">Back-End</option>
        <option value="frontend">Front-End</option>
        <option value="ios">iOS</option>
        <option value="swift">Swift</option>
      </select>
    </Wrapper>
  );
};

export default CategorySelector;
