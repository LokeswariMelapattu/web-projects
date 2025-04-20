
const Filter = ({ filter, handleFilterChange }) =>
{
    return (
        <div>
            filter shown with: <input value={filter} onChange={handleFilterChange}
                placeholder="Enter filter text" />
        </div>
    )
}

export default Filter;