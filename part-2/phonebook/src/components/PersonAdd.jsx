const PersonAdd = ({ newName, newNumber, handleNameChange, handleNumberChange, handleSubmit }) =>
{
    return (
        <form onSubmit={handleSubmit}>
            <div>
                name: <input
                    value={newName}
                    onChange={handleNameChange}
                    placeholder="Enter name"
                    required
                />
            </div>
            <div>
                number: <input
                    value={newNumber}
                    onChange={handleNumberChange}
                    placeholder="Enter number"
                    required
                />
            </div>
            <button type="submit">add</button>
        </form>
    )

}

export default PersonAdd;