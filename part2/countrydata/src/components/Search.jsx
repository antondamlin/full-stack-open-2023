const Search = ({ searchValue, searchChange }) => {
  return (
    <div>
      find countries <input value={searchValue} onChange={searchChange}></input>
    </div>
  );
};

export default Search;
