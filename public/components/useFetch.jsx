import { useState, useEffect } from "react";
const makeDelay = timeInMs => {
  return new Promise(res => setTimeout(res, timeInMs));
};

const myHeader = new Headers({
  "x-access-token": "dauqsedoc"
});
const options = {
  method: "GET",
  headers: myHeader,
  mode: "cors"
};

const useFetch = (url, callback, errorHandler = () => {}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      console.log("test");
      console.log(myHeader.get("x-access-token"));
      try {
        // await makeDelay(1000);
        const res = await fetch(url, options);
        if (res instanceof Promise) throw Error("REQUEST FAILED");
        if (!res.ok) throw Error(`STATUS CODE : ${res.status}`);
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
