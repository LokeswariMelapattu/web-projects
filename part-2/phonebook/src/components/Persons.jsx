
const Person = ({ person, handleDelete }) =>
{
    return <>
        <p>{person.name} {person.number}
            <button type="button" onClick={() => handleDelete(person.id)}>Delete</button>
        </p>
    </>
}

const Persons = ({ persons, filter, handleDelete }) =>
{
    const filteredPersons = persons?.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
        <div>
            {filteredPersons?.length > 0 ? (
                filteredPersons.map((person) => (
                    <Person key={person.name} person={person} handleDelete={handleDelete} />
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}


export default Persons;