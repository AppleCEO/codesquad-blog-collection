import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Category from "./Category.jsx";
import Contents from "./Contents.jsx";
import useFetch from "../useFetch.jsx";
import CONFIGS from "../../constants/configs.js";
import Pagination from "./Pagination.jsx";
import SimpleModal from "./Modal.jsx";

const Div = styled.div`
  font-size: 2rem;
  border: 1px solid palevioletred;
`;

const Main = props => {
  const [state, setState] = useState({ categories: [], links: { docs: [] } });
  let loading = useFetch(CONFIGS.url, setState);

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

  const requestPage = async targetPage => {
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
      {!loading && <Contents data={state.links.docs} />}
      {!loading && <Pagination pageData={state.links} onClick={requestPage} />}
      <SimpleModal />
    </Div>
  );
};

export default Main;
