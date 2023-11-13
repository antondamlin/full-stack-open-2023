const CountriesData = ({ displayArray, showDetails, weatherData }) => {
  if (displayArray) {
    if (displayArray.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (displayArray.length > 1) {
      return (
        <div>
          {displayArray.map((count) => (
            <div style={{ display: "flex" }} key={count.name.common}>
              <p>{count.name.common}</p>
              <button onClick={(event) => showDetails(count)}>show</button>
            </div>
          ))}
        </div>
      );
    } else if (displayArray.length === 1) {
      const returnVal = displayArray[0];
      return (
        <div>
          <h2>{returnVal.name.common}</h2>
          <p>capital {returnVal.capital[0]}</p>
          <p>area {returnVal.area}</p>
          <h3>languages:</h3>
          <ul>
            {Object.values(returnVal.languages).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
          <img src={returnVal.flags.png} alt={returnVal.flags.alt} />
          {weatherData !== null ? (
            <div>
              <h2>Weather in {returnVal.capital[0]}</h2>
              <p>temperature {weatherData.temp_c} Celsius</p>
              <img
                src={weatherData.condition.icon}
                alt={weatherData.condition.text}
              />
              <p>wind {(weatherData.wind_kph / 3.6).toFixed(2)} m/s</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      );
    }
  }
};

export default CountriesData;
