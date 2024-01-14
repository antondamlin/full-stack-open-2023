import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`
      )
      .then((response) => {
        setCountry(response.data);
      })
      .catch((err) => {
        console.log(err);
        setCountry(err);
      });
  }, [countryName]);

  if (countryName === "") {
    return null;
  }

  if (!country) {
    return {};
  }

  return country;
};
