import '../index.css'

const Notification = ({ isError, message }) =>
{
    if (message === null) return null
    return (
        <div className={isError ? 'error' : 'success'}>
            {message}
        </div>
    )
}
export default Notification