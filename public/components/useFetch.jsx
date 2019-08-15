import { useState, useEffect } from "react";
const makeDelay = timeInMs => {
  return new Promise(res => setTimeout(res, timeInMs));
};

const option = {
  mode: "cors"
};

const useFetch = (url, callback, errorHandler = () => {}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        // await makeDelay(1000);
        const res = await fetch(url);
        if (!res.ok) throw Error(`STATUS CODE : ${res.status}`);
        if (res instanceof Promise) throw Error("REQUEST FAILED");
        const data = await res.json();
        console.log(data);
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
