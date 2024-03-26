import React, { useEffect, useState } from "react";

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
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MTA1MjEyMjYsImV4cCI6MTcxMTczMDgyNn0.zkZixUS1Io6G7bHCHI2lacbAO8XL06TcJqBdV-lbBlk",
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
    getCommentsFromApi();
  }, [endpoint]);
  return { loading, data, error };
};

export default useFetchComments;