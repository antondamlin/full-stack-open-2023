const PersonForm = ({ personsToShow, onDelete }) => {
  return (
    <div>
      {personsToShow.map((person) => (
        <div key={person.name} style={{ display: "flex" }}>
          <p>
            {person.name} {person.number}
          </p>
          <button
            type="submit"
            onClick={() => {
              onDelete(person);
            }}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default PersonForm;
