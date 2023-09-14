import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import Todo from '../../Components/Todo'
import { db } from "../../Config/Firebase"
import { getDocs, collection, query, onSnapshot, where, orderBy } from 'firebase/firestore'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { auth } from '../../Config/Firebase'

function Home() {

    const [todoList, setTodoList] = useState([])
    const todosCollectionRef = collection(db, "todos")

    const uid = auth?.currentUser?.uid
    const todosRef = collection(db, "todos")
   
    console.log(uid)

    useEffect(() => {
        const getTodoList =  async () => {
            try {
              const q = await query(
                todosRef,
                where("uid", "==", uid),
                orderBy("createdAt", "desc")
              )

              await onSnapshot(q, (querySnapshot) => {
                setTodoList(
                  querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                  }))
                )
              })
            } catch (err) {
                console.error(err)
            }
        }

        getTodoList()
    }, [])

    useEffect(() => {
        const updateTodo = async () => {

        }

        updateTodo()
    }, [todoList])
    
//   const [todoList, setTodoList] = useState([
//     {
//       todoId: 0,
//       todoName: "Personal",
//       todoTasks: []
//     },
//     {
//       todoId: 1,
//       todoName: "Work",
//       todoTasks: []
//     },
//     {
//       todoId: 2,
//       todoName: "College",
//       todoTasks: []
//     }
//   ])

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

export default Home
