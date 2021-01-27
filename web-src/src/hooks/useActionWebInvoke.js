import { useState, useEffect } from "react";
import actionWebInvoke from "../utils";

export const useActionWebInvoke = ({
  actionName,
  headers = {},
  params = {},
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // invoke Action
    actionWebInvoke(actionName, headers, params)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((e) => {
        setData(null);
        setIsLoading(false);
        setError(e);
      });
  }, []);
  return { data, isLoading, error };
};
