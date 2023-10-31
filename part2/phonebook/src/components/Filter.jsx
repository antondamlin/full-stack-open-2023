const Filter = (props) => {
  return (
    <div>
      <h2>Phonebook</h2>
      filter names:{" "}
      <input value={newFilter} onChange={handleFilterChange}></input>
    </div>
  );
};
