import { useState, useEffect } from "react";

function useFetch(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error("Could not find data for that resource !");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
          setErr(null);
        })
        .catch((err) => {
          setData(null);
          setErr("could not get the data !");
          setIsLoading(false);
        });
    }, 1000);
  }, [url]);
  return { data, err, isLoading };
}

export default useFetch;
