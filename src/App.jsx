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

  const[currentTodoId, setCurrentTodoId] = useState(0)

  const todo = todoList.find(
    ({todoId}) => todoId === currentTodoId
  )

  return (
    <>
      <Navbar 
        todoList = {todoList}
        currentTodo = {currentTodoId}
        setCurrentTodo = {setCurrentTodoId}
        setTodoList = {setTodoList}
      />
      {todo !== undefined && (
        <Todo 
          currentTodo = {currentTodoId}
          todoList = {todoList}
          setTodoList = {setTodoList}
          id = {todoList.todoId}
        />
      )}     
    </>
  )
}

export default App
