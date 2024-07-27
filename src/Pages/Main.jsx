import React from "react";
import { useState, useEffect } from "react";

import Navbar from "../Components/Navbar";
import Todo from "../Components/Todo";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Main = ({ setUserIsAuthenticated, userIsAuthenticated }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(docRef);
      
      if(docSnap.exists()){
        setTodoList(docSnap.data().todoList);
      }

      setIsLoading(false)
    }

    getData();
  }, []);

  useEffect(() => {
    if(!isLoading){
      async function setData(){
        setDoc(doc(db, "users", auth.currentUser.uid), {
          userName: auth.currentUser.uid,
          todoList
        })
      }
  
      setData()
    }
  }, [todoList])

  const [currentTodoId, setCurrentTodoId] = useState(0);

  const todo = todoList?.find(({ todoId }) => todoId === currentTodoId);

  return (
    <>
      {todoList && (
        <Navbar
          todoList={todoList}
          currentTodoId={currentTodoId}
          setCurrentTodoId={setCurrentTodoId}
          setTodoList={setTodoList}
          setUserIsAuthenticated={setUserIsAuthenticated}
        />
      )}

      {todo !== undefined && (
        <Todo
          currentTodoId={currentTodoId}
          todoList={todoList}
          setTodoList={setTodoList}
          id={todoList.todoId}
        />
      )}
    </>
  );
};

export default Main;
