import { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

export const TodosContext = createContext();

const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [tags, setTags] = useState([])
  const [currentTag, setCurrentTag] = useState(); // Assuming tags are strings
  const [isLoading, setIsLoading] = useState(true);

  const user = auth.currentUser; // Get current user inside useEffect
  
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
          setIsLoading(false); // Set loading to false when data is fetched
        });
        console.log(todos)
        // Cleanup listener on unmount
        return () => unsubscribeTodos();
      } else {
        // If no user, set loading to false immediately
        setIsLoading(false);
      }
    };

    const fetchTags = () => {
      if (user) {
        const q = query(
          collection(db, "tags"),
          where("userId", "==", user.uid),
        );

        const unsubscribeTags = onSnapshot(q, (querySnapshot) => {
          const tagsList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setTags(tagsList);
          setCurrentTag(tagsList[0].tag)
          setIsLoading(false); // Set loading to false when data is fetched
        });

        // Cleanup listener on unmount
        return () => unsubscribeTags();
      } else {
        // If no user, set loading to false immediately
        setIsLoading(false);
      }
    };

    fetchTodosByTag();
    fetchTags()

    console.log(currentTag)
  }, [currentTag, user]);

  const todosContextValues = {
    todos,
    setCurrentTag,
    currentTag,
    tags,
    isLoading, // Include loading state in context
  };

  return (
    <TodosContext.Provider value={todosContextValues}>
      {isLoading ? <div>Loading...</div> : children} {/* Show loading indicator */}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
