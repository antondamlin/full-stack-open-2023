const Filter = ({ filterValue, filterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterValue} onChange={filterChange}></input>
    </div>
  );
};

export default Filter;
