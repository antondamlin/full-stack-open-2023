const PersonForm = ({
  addNewPerson,
  nameVal,
  numberVal,
  changeName,
  changeNumber,
}) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={nameVal} onChange={changeName} />
      </div>
      <div>
        number: <input value={numberVal} onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
