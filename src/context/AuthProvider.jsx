import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { useEffect } from "react";

const AuthProvider = ({ children }) => {
  const [users, setUser] = useState(null);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const updateUserProfile =(updateData)=> {
    return updateProfile(auth.currentUser , updateData)
  }

  const signInWithGoogle = ()=> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth , provider)
  }

  const userInfo = {
    createUser,
    users,
    setUser,
    signInUser,
    signOutUser,
    updateUserProfile,
    signInWithGoogle
  };
  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
