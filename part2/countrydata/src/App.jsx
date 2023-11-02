import { useState, useEffect } from "react";
import Search from "./components/Search";
import { default as coutriesService } from "./services/countries";
import CountriesData from "./components/CountriesData";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [displayCountries, setDisplayContry] = useState(null);

  useEffect(() => {
    coutriesService
      .getAll()
      .then((response) => {
        setDisplayContry(response.data.map((c) => c.name.common));
        setCountries(response.data);
      })
      .catch((errror) => {
        console.log(errror);
      });
  }, []);

  const handleSearchChange = (event) => {
    const searchCountries = countries.filter((c) =>
      c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setDisplayContry(searchCountries);
    setSearch(event.target.value);
  };

  return (
    <>
      <Search searchValue={search} searchChange={handleSearchChange} />
      <CountriesData displayArray={displayCountries} />
    </>
  );
}

export default App;
