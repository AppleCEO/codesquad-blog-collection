import { useState, useEffect } from 'react';
import CONFIGS from '../constants/configs';

const options = {
  method: 'GET',
  headers: CONFIGS.HEADER,
  mode: 'cors'
};

const useFetch = (url, callback, errorHandler = () => {}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(url, options);
        if (res instanceof Promise) throw Error('REQUEST FAILED');
        if (!res.ok) throw Error(`STATUS CODE : ${res.status}`);
        const data = await res.json();
        callback(data);
      } catch (err) {
        console.warn(err);
        errorHandler();
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return loading;
};

export default useFetch;
