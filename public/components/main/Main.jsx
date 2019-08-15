import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "./Category.jsx";
import Contents from "./Contents.jsx";
import useFetch from "../useFetch.jsx";
import CONFIGS from "../../constants/configs.js";
import Pagination from "./Pagination.jsx";
import Register from "./Register.jsx";
import SimpleModal from "./Modal.jsx";

const Div = styled.div`
  font-size: 2rem;
  border: 1px solid #3f51b5;
`;

const Main = props => {
  const [state, setState] = useState({ categories: [], links: { docs: [] } });
  useFetch(CONFIGS.url, setState);

  const requestCategory = async ({ target }) => {
    const targetCategory = target.closest("button").value;
    const queryString = targetCategory === "all" ? "" : `?category=${targetCategory}`;
    try {
      const res = await fetch(`${CONFIGS.url}/${queryString}`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      setState(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPage = async ({ target }) => {
    const targetPage = target.closest("button").value;
    try {
      const res = await fetch(`${CONFIGS.url}/?page=${targetPage}`);
      console.log(res);
      const data = await res.json();
      console.log(data);
      setState(data);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Div>
      <Category data={state.categories} onClick={requestCategory} />
      <Contents data={state.links.docs} />
      <Pagination onClick={requestPage} />
      <SimpleModal />
    </Div>
  );
};

export default Main;
