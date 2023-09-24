import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'

import './App.css'
import Header from './components/Header'
import Die from './components/Die'
import Confetti from 'react-confetti'
import Scoreboard from './components/ScoreBoard'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return newDice
  }

  function holdDie(id) {
    setDice(oldDice => oldDice.map(dice => (
        dice.id === id ? {...dice, isHeld: dice.isHeld ? false : true } 
        : dice
      )))
  }

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  },[dice])

  function rollDice() {
    if (!tenzies){
      setDice(oldDice => oldDice.map(die => (
        die.isHeld ? {...die} : {
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false
          }
      )))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  const diceElement = dice.map(die => {
    return <Die 
              key={nanoid()} 
              value={die.value} 
              isHeld={die.isHeld}
              holdDie={()=>holdDie(die.id)}
            />
  })

  return (
    <main>
      {tenzies && <Confetti />}
      <Header />
      <div className="dice">
        {diceElement}
      </div>
      <button onClick={rollDice} className='roll-btn'>{tenzies ? "New Game" : "Roll"}</button>
      {tenzies && <p className='win-txt'>YOU WIN!</p>}
      {/* <Scoreboard /> to be continue */}
    </main>
  )
}

export default App
