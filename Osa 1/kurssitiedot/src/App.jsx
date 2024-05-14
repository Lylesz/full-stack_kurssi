const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  const Part = (props) => {
    return (
      <p> {props.name} {props.exercises}  </p>
    )
  }
  
  const Header = () => {
    return (
      <h1>{course.name} </h1> 
       )
  }

  const Content = () => {
    return (   
    <div>
        <Part name={course.parts[0].name} exercises={course.parts[0].exercises} />
        <Part name={course.parts[1].name} exercises={course.parts[1].exercises} />
        <Part name={course.parts[2].name} exercises={course.parts[2].exercises} />
    </div>
    )
  }


  const Total = () => {
    return(
      <p>Number of exercises {course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises}</p>
    )
   }


  return (
    <div>
    
      <Header/>
      <Content/>
      <Total/>
    </div>
  )
}

export default App