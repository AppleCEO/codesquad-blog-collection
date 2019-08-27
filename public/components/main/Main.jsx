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
  border: 1px solid #3f51b5;
`;

const Main = () => {
  const [state, setState] = useState({ categories: [], links: { docs: [] } });
  const [category, setCategory] = useState("all");
  const loading = useFetch(CONFIGS.url, setState);

  const myHeader = new Headers({
    "x-access-token": "dauqsedoc"
  });
  const options = {
    method: "GET",
    headers: myHeader,
    mode: "cors"
  };

  const requestCategory = async ({ target }) => {
    const targetCategory = target.closest("button").value;
    setCategory(targetCategory);
    const queryString = targetCategory === "all" ? "" : `?category=${targetCategory}`;
    try {
      console.log(options);
      const res = await fetch(`${CONFIGS.url}${queryString}`, options);
      const data = await res.json();
      setState(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPage = async targetPage => {
    const categoryQuery = category === "all" ? "" : `category=${category}&`;
    try {
      console.log(options);
      const res = await fetch(`${CONFIGS.url}/?${categoryQuery}page=${targetPage}`, options);
      const data = await res.json();
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
