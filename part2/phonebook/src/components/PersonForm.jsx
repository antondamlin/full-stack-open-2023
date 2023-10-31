const PersonForm = ({
  postNote,
  nameVal,
  numberVal,
  changeName,
  changeNumber,
}) => {
  return (
    <form onSubmit={postNote}>
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
