import React, { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged, updateProfile, sendEmailVerification } from "firebase/auth";

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const auth = getAuth(app);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
  }

  const googleProvider = (provider) => {
      setLoading(true);
      return signInWithPopup(auth, provider);
  }

  const verifyEmail = () => {
    setLoading(true);
    return sendEmailVerification(auth.currentUser);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
  }

  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile);
  }

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      if(currentUser?.emailVerified){
        setUser(currentUser);
      }
      setLoading(false);
    })
    return () => unsubscribed()
  }, [])

  const authInfo = { user, loading, setLoading, createUser, signIn, googleProvider, logOut, updateUserProfile, verifyEmail };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
