import { useState } from 'react'

const Section = (props) => <h1>{props.name}</h1>

const Statistics = ({data}) => {
  const {name, good, neutral, bad, all} = data
  if (data.all === 0) {
    return (
      <>
        <Section name={name}/>
        <div>No feedback given</div>
      </>
    )
  }

  const avg = (good - bad) / all
  const positive = good * 100 / all + " %"

  return (
    <>
      <Section name={name}/>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={avg}/>
          <StatisticLine text="positive" value={positive}/>
        </tbody>
      </table>
    </>
  )
}

const Button = (props) => <button onClick={props.operation}>{props.name}</button>

const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const statistics = {
    name: "statistics",
    good: good,
    neutral: neutral,
    bad: bad,
    all: all
  }

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <Section name="give feedback"/>
      <Button name="good" operation={increaseGood}/>
      <Button name="neutral" operation={increaseNeutral}/>
      <Button name="bad" operation={increaseBad}/>
      <Statistics data={statistics}/>
    </div>
  )
}

export default App