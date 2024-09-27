import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithPopup,
  } from "firebase/auth";

  import { googleProvider } from "../config/firebase";
  
  import { useState, useEffect } from "react";
  
  export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
  
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);
  
    const auth = getAuth();
  
    function checkIfIsCancelled() {
      if (cancelled) {
        return;
      }
    }
  
    const createUser = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
  
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
  
        await updateProfile(user, {
          displayName: data.displayName,
        });
  
        return user;
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
  
        let systemErrorMessage;
  
        if (error.message.includes("Password")) {
          systemErrorMessage = "Password must be at least 6 character long.";
        } else if (error.message.includes("email-already")) {
          systemErrorMessage = "Email already registered.";
        } else {
          systemErrorMessage = "Something went wrong, please try again later.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };
  
    const logout = () => {
      checkIfIsCancelled();
  
      signOut(auth);
    };
  
    const login = async (data) => {
      checkIfIsCancelled();
  
      setLoading(true);
      setError(false);
  
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        console.log(error.message);
        console.log(typeof error.message);
        console.log(error.message.includes("user-not"));
  
        let systemErrorMessage;
  
        if (error.message.includes("user-not-found")) {
          systemErrorMessage = "User not found.";
        } else if (error.message.includes("wrong-password")) {
          systemErrorMessage = "Password incorrect.";
        } else {
          systemErrorMessage = "Something went wrong, please try again later.";
        }
  
        setError(systemErrorMessage);
      }
  
      setLoading(false);
    };

   const signInWithGoogle = async() => {
        try {
          await signInWithPopup(auth, googleProvider);
        } catch (err) {
          console.error(err);
        }
      }
  
    useEffect(() => {
      return () => setCancelled(true);
    }, []);
  
    return {
      auth,
      createUser,
      error,
      setError,
      logout,
      login,
      loading,
      signInWithGoogle
    };
  };