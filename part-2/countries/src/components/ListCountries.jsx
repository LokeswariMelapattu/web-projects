const ListCountries = ({ countries, handleSelectCountry }) =>
{
    if (countries.length > 10)
    {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length === 1)
    {
        return null
    }
    if (countries.length === 0)
    {
        return <p>No countries found</p>
    }
    return (
        <div>
            <ul>
                {countries.map((country) => (
                    <li key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => handleSelectCountry(country)}>show</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListCountries;