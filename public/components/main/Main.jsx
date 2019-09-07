import React, { useState } from 'react';
import styled from 'styled-components';
import Category from './Category';
import Contents from './Contents';
import useFetch from '../../hooks/useFetch';
import CONFIGS from '../../constants/configs';
import Pagination from './Pagination';
import SimpleModal from './Modal';
const { URL, HEADER } = CONFIGS;

const Div = styled.div`
  font-size: 2rem;
  border: 1px solid #3f51b5;
`;

const Main = () => {
  const [state, setState] = useState({ categories: [], links: { docs: [] } });
  const [category, setCategory] = useState('all');
  const loading = useFetch(URL, setState);

  const options = {
    method: 'GET',
    headers: HEADER,
    mode: 'cors'
  };

  const requestCategory = async ({ target }) => {
    const targetCategory = target.closest('button').value;
    setCategory(targetCategory);
    const queryString =
      targetCategory === 'all' ? '' : `?category=${targetCategory}`;
    try {
      const res = await fetch(`${URL}${queryString}`, options);
      const data = await res.json();
      setState(data);
    } catch (err) {
      console.warn(err);
    }
  };

  const requestPage = async targetPage => {
    const categoryQuery = category === 'all' ? '' : `category=${category}&`;
    try {
      const res = await fetch(
        `${URL}/?${categoryQuery}page=${targetPage}`,
        options
      );
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
