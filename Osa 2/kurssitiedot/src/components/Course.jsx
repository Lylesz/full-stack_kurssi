
const Header = ({course}) => {
    return (
      <h2>{course.name} </h2> 
       )
  }

  const Part = ({name, exercises}) => {
    return (
      <p> {name} {exercises}  </p>
    )
  }

  const Content = ({course}) => {

    return ( 
      <div>
        {course.parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
     </div>
    )
  }
  
  const Total = ({course}) => {
    const total = course.parts.reduce((acc, part) => acc + part.exercises, 0)
    
    return(
      <p>Number of exercises: {total}</p>
    )
   }

const Course = ({ course }) => {
    return (
      <div>
        {course.map(course => (
          <div key={course.id}>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
          </div>
        ))}
      </div>
    )
  }
  export default Course