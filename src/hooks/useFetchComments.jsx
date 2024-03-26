import { useEffect, useState } from "react";

const useFetchComments = (endpoint) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCommentsFromApi = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MTE0NjM1NTcsImV4cCI6MTcxMjY3MzE1N30.whnXUzpEpxDxQlBm2xQ8IF25jBhlm6X4VSxtwbK1XlY",
          },
        });
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    };

    const fetchData = async () => {
      await getCommentsFromApi();
    };

    fetchData();
  }, [endpoint]);

  return { loading, data, error };
};

export default useFetchComments;
