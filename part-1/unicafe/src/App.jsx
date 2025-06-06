import { useState } from 'react'

const Button = ({ handleClick, text }) =>
{
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const StatisticsLine = ({ text, value }) =>
{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) =>
{
  // calculate average feedback
  const calculateAverage = () =>
  {
    const all = good + neutral + bad
    if (all === 0) return 0
    return (good - bad) / all
  }
  // calculate positive feedback 
  const calculatePositive = () =>
  {
    const all = good + neutral + bad
    if (all === 0) return 0 + ' %'
    return (good / all) * 100 + ' %'
  }

  // if no feedback given
  if (good === 0 && neutral === 0 && bad === 0)
  {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  // if feedback given
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={good + neutral + bad} />
          <StatisticsLine text="average" value={calculateAverage()} />
          <StatisticsLine text="positive" value={calculatePositive()} />
        </tbody>
      </table>
    </div>
  )
}


const App = () =>
{
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App