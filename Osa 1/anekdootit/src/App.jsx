import React, { useState } from 'react'


const Display = ({pressed, selected, anecdotes, handleVoteClick, points}) => {
  const eniten=Math.max(...points)
  if (pressed === 0) {
  
  return (
    <div>
      <p>No anecdotes</p>
    
    </div>
  )
}

return(
  <div>
    <h1>Anecdote of the day</h1>
    <p>{anecdotes[selected]}</p>
    <button onClick={handleVoteClick}> Vote </button>
    <p>votes {points[selected]}</p>
    <h1>Anecdote with most votes</h1>
    <p>{anecdotes[points.indexOf(eniten)]}</p>


  </div>

)
 
  
  

}



const App = () => {

  const [selected, setSelected] = useState(0)
  const [pressed, setPressed] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const handleClick = () => {
    setPressed(pressed + 1)
    const random = Math.floor(Math.random() * anecdotes.length)
    console.log(random)
    const updatedSelected =random
    setSelected(updatedSelected)
    anecdotes[selected]
   
  }

  const handleVoteClick = () => {
    const kopio = [...points]
    kopio[selected] += 1
    setPoints(kopio)
    console.log(kopio)

  }

  return (
  <div>
    <button onClick={handleClick}>new anecdote</button>
    <Display pressed={pressed} selected={selected} anecdotes={anecdotes}
     handleVoteClick={handleVoteClick} points={points}/>
  
  </div>
  )
}

export default App
