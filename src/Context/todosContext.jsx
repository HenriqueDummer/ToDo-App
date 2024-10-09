import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export const TodosContext = createContext();

const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const user = auth.currentUser;

  useEffect(() => {
    const fetchTodosByTag = () => {
      if (user && currentTag) {
        const q = query(
          collection(db, "todos"),
          where("userId", "==", user.uid),
          where("tag", "==", currentTag)
        );

        const unsubscribeTodos = onSnapshot(q, (querySnapshot) => {
          const todoList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTodos(todoList);
          setIsLoading(false);
        });

        return () => unsubscribeTodos();
      } else {
        setIsLoading(false);
      }
    };

    const fetchTags = () => {
      if (user) {
        const q = query(
          collection(db, "tags"),
          where("userId", "==", user.uid)
        );

        const unsubscribeTags = onSnapshot(q, (querySnapshot) => {
          const tagsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTags(tagsList);
          setIsLoading(false);
        });

        return () => unsubscribeTags();
      } else {
        setIsLoading(false);
      }
    };

    fetchTodosByTag();
    fetchTags();
  }, [currentTag, user]);

  const addNewTag = async (tagName) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "tags"),
        where("name", "==", tagName),
        where("userId", "==", user.uid)
      );

      const existingDocument = await getDoc(q);

      if (existingDocument) {
        console.log("Tag name already exists");
        return { success: false, error: "Collection name already exists" };
      }

      await addDoc(collection(db, "tags"), { name: tagName, userId: user.uid });

      return { success: true }; 

    } catch (error) {
      console.error(error);
      return { success: false, error: "Could not add new category" };
    } finally {
      setIsLoading(false);
    }
  };

  const addNewTodo = async (task) => {
    try {
      const newTodo = {
        task,
        userId: user.uid,
        tag: currentTag,
        completed: false,
      };
      await addDoc(collection(db, "todos"), newTodo);
      return { success: true }; 
    } catch (error) {
      console.error(error);
      return { success: false, error: "Could not add new todo" };
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await deleteDoc(doc(db, "todos", todoId));
      return { success: true }; 
    } catch (error) {
      console.error(error);
      return { success: false, error: "Could not delete todo" };
    }
  };

  const toggleTodoComplete = async (todoId, currentCompleted) => {
    try {
      await updateDoc(doc(db, "todos", todoId), {
        completed: !currentCompleted,
      });
      return { success: true }; 
    } catch (error) {
      console.error(error);
      return { success: false, error: "Could not check/uncheck todo" };
    }
  };

  const todosContextValues = {
    todos,
    tags,
    currentTag,
    setCurrentTag,
    addNewTag,
    addNewTodo,
    deleteTodo,
    toggleTodoComplete,
    isLoading,
  };

  return (
    <TodosContext.Provider value={todosContextValues}>
      {isLoading ? <div>Loading...</div> : children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
