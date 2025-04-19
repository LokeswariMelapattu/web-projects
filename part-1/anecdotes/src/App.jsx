import { useState } from 'react'

const App = () =>
{
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voteCount, setVoteCount] = useState([0, 0, 0, 0, 0, 0, 0, 0])
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)

  // Vote for the selected anecdote 
  // Set the mostVoted anecdote to the selected one 
  const vote = () =>
  {
    const copy = [...voteCount]
    copy[selected] += 1
    setVoteCount(copy)

    if (copy[selected] > mostVotes)
    {
      setMostVotes(copy[selected])
      setMostVoted(selected)
    }
  }
  // Get a random anecdote
  const getRandomAnecdote = () =>
  {
    const randomIndex = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomIndex)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {voteCount[selected]} votes</div>
      <button onClick={vote}>Vote</button>
      <button onClick={getRandomAnecdote}>Next Anecdote</button>
      <h1>Anecdote with most values</h1>
      <div>{anecdotes[mostVoted]}</div>
      <div>has {mostVotes} votes</div>
    </div>
  )
}

export default App