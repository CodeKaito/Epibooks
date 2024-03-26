import { useEffect, useState } from "react";

const useFetchComments = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const getCommentsFromApi = async () => {
    setLoading(true);
    try {
      const data = await fetch(endpoint, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MTE0NDg0MTgsImV4cCI6MTcxMjY1ODAxOH0.7JsncRqW6mP05TsAJBeX2OuY8bKxv-vlJStutqXRjrI",
        },
      });
      const response = await data.json();
      setData(response);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCommentsFromApi();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { loading, data, error };
};

export default useFetchComments;
