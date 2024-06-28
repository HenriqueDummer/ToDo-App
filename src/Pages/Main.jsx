import React from 'react'
import { useState } from 'react'

import Navbar from '../Components/Navbar'
import Todo from '../Components/Todo'

const Main = ({setUserIsAuthenticated}) => {
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
            currentTodoId = {currentTodoId}
            setCurrentTodoId = {setCurrentTodoId}
            setTodoList = {setTodoList}
            setUserIsAuthenticated={setUserIsAuthenticated}
          />
          {todo !== undefined && (
            <Todo 
              currentTodoId = {currentTodoId}
              todoList = {todoList}
              setTodoList = {setTodoList}
              id = {todoList.todoId}
            />
          )}     
        </>
      )
}

export default Main