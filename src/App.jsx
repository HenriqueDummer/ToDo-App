import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Todo from './Components/Todo'
import './App.css'

function App() {

  const [todoList, setTodoList] = useState([
    {
      todoId: 0,
      todoName: "Personal",
      todoTasks: []
    },
    {
      todoId: 1,
      todoName: "Work",
      todoTasks: []
    },
    {
      todoId: 2,
      todoName: "College",
      todoTasks: []
    }
  ])

  const[currentTodo, setCurrentTodo] = useState(2)

  return (
    <>
      <Navbar 
        todo = {todoList}
        currentTodo = {currentTodo}
        setCurrentTodo = {setCurrentTodo}
      />
      {
        todoList.map((todo) => {
          if(todo.todoId === currentTodo){
            return(
              <Todo 
                currentTodo = {currentTodo}
                todoList = {todoList}
                setTodoList = {setTodoList}
                id = {todoList.todoId}
              />
            )
          }})
      }
      {console.log(currentTodo)}
      {console.log(todoList[currentTodo])}
      
    </>
  )
}

export default App
