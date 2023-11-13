import { useState, useEffect } from "react";
import Search from "./components/Search";
import { default as coutriesService } from "./services/countries";
import CountriesData from "./components/CountriesData";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState(null);
  const [displayCountries, setDisplayContry] = useState(null);
  const [countryWeather, setcountryWeather] = useState(null);
  const [countryWeatherData, setcountryWeatherData] = useState(null);

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

  useEffect(() => {
    if (countryWeather) {
      coutriesService
        .getWeatherData(countryWeather)
        .then((response) => {
          setcountryWeatherData(response.data.current)
        });
    }
  }, [countryWeather]);

  const handleSearchChange = (event) => {
    const searchCountries = countries.filter((c) =>
      c.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    );
    if (
      searchCountries.length === 1 &&
      searchCountries[0].capital !== countryWeather
    ) {
      setcountryWeather(searchCountries[0].capital);
    }
    setDisplayContry(searchCountries);
    setSearch(event.target.value);
  };

  const handleShowDetailsClick = (country) => {
    setDisplayContry([country]);
    setcountryWeather(country.capital);
    setSearch(country.name.common);
  };

  return (
    <>
      <Search searchValue={search} searchChange={handleSearchChange} />
      <CountriesData
        displayArray={displayCountries}
        showDetails={handleShowDetailsClick}
        weatherData={countryWeatherData}
      />
    </>
  );
}

export default App;
