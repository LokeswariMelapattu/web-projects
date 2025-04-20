
const Person = ({ person }) =>
{
    return <p>{person.name} {person.number}</p>
}

const Persons = ({ persons, filter }) =>
{
    const filteredPersons = persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
        <div>
            {filteredPersons.length > 0 ? (
                filteredPersons.map((person) => (
                    <Person key={person.name} person={person} />
                ))
            ) : (
                <p>No results found</p>
            )}
        </div>
    );
}


export default Persons;