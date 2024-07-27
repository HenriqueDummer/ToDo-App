import React, { useRef, useState } from "react";
import { auth, googleProvider } from "../config/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { db } from "../config/firebase";
import LoginComponent from "../Components/LoginComponent";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const initialData = [
  {
    todoId: 0,
    todoName: "Personal",
    todoTasks: [],
  },
  {
    todoId: 1,
    todoName: "Work",
    todoTasks: [],
  },
  {
    todoId: 2,
    todoName: "College",
    todoTasks: [],
  },
];

export async function signUp(email, password) {
  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        return await setDoc(doc(db, "users", cred.user.uid), {
          name: cred.user.uid,
          todoList: initialData,
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
}

export async function signInWithGoogle() {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
}

export async function logIn(email, password) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }
