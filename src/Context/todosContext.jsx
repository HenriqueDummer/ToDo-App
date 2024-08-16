import { createContext, useState } from "react";
import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const TodosContext = createContext();

const TodosContextProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);
  const [currentTodoId, setCurrentTodoId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currentTodo = todoList?.find(({ todoId }) => todoId === currentTodoId);

  // ------------ Firebase Data ---------------------------
  const loadUserData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTodoList(docSnap.data().todoList);
    }

    setIsLoading(false);
  };

  const setUserData = async () => {
    if (!isLoading) {
      async function setData() {
        setDoc(doc(db, "users", auth.currentUser.uid), {
          userName: auth.currentUser.uid,
          todoList,
        });
      }

      setData();
    }
  };

  // ------------------ Todos Functions --------------------

  const addNewTodo = () => {
    const newTodo = {
      todoId: todoList[todoList.length - 1].todoId + 1,
      todoName: "New todo",
      todoTasks: [],
    };

    setTodoList((prev) => [...prev, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => {
      return todo.todoId !== id;
    });

    setTodoList(updatedTodoList);
    setCurrentTodoId(updatedTodoList[0].todoId);
  };

  const changeTodo = (id) => {
    setCurrentTodoId(id);
  };

  // ------------------ Todos Tasks Functions --------------------
  const newTodoList = [...todoList];

  const completeTask = (id) => {
    const taskIndex = currentTodo.todoTasks.findIndex((task) => task.id === id);

    if (taskIndex !== -1) {
      currentTodo.todoTasks[taskIndex].isCompleted ^= true;
      setTodoList(newTodoList);
    }
  };

  const removeTask = (id) => {
    const updatedTodo = currentTodo.todoTasks.filter((task) => {
      return task.id != id;
    });

    currentTodo.todoTasks = updatedTodo;
    setTodoList(newTodoList);
  };

  // -----------------------------------------------------------

  const todosContextValues = {
    todoList,
    setTodoList,
    currentTodoId,
    currentTodo,
    loadUserData,
    setUserData,
    addNewTodo,
    removeTodo,
    changeTodo,
    completeTask,
    removeTask,
  };

  return (
    <TodosContext.Provider value={todosContextValues}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
