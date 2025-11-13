const Header = (props) => {
    return (
        <h2>{props.name}</h2>
    )
}
  
const Content = ({parts}) => {
    return (
        <>
        {parts.map( part => <Part part={part} key={part.id}/>)}
        <Total total={parts.reduce((sum,part) => sum + part.exercises, 0)} />
        </>
    )
}
  
const Part = ({part}) => {
    return (
        <p>
        {part.name} {part.exercises}
        </p>
    )
}
  
const Total = ({total}) => {
    return (
        <p><b>total of {total} exercises</b></p>
    )
}
  
const Course = ({course}) => {
    return (
        <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        </>
    )
}

export default Course;