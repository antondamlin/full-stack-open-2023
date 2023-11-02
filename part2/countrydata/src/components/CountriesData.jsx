const CountriesData = ({ displayArray }) => {
  if (displayArray) {
    if (displayArray.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (displayArray.length > 1) {
      return (
        <div>
          {displayArray.map((c) => (
            <p key={c.name.common}>{c.name.common}</p>
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
          <img src={returnVal.flags.png} alt={returnVal.flags.alt}/>
        </div>
      );
    }
  }
};

export default CountriesData;
