import { useEffect, useState, useCallback } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const getData = useCallback(async () => {
    if (!url) return (setError(true), setLoading(false), setErrorMsg('Error: Url is missing'));

    const res = await fetch(url);
    const fetchedData = await res.json();
   
    if (!fetchedData.length) return (setLoading(false), setError(true), setErrorMsg('Error: There is no data'));

    if (fetchedData) return (setLoading(false), setData(fetchedData));

  },[url]);

  useEffect(() => {
    getData();
  }, [url, getData]);

  return { data, loading, error, errorMsg };
};

export default useFetch;
