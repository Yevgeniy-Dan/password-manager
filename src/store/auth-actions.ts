import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { AppDispatch } from ".";
import { app } from "../module/firebase";
import { authActions } from "./auth-slice";

const auth = getAuth(app);

export const getCurrentUser = () => {
  return (dispatch: AppDispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authActions.login());
        console.log("gru: ", user);
      } else {
        dispatch(authActions.logout());
      }
    });
  };
};

export const signIn = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("signIn: ", auth.currentUser);
  } catch (error) {
    // Notification with error can't create new user
    // const errorCode = error.code;
    // const errorMessage = error.message;
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("logIn: ", auth.currentUser);
  } catch (error) {
    // Notification with error can't create new user
    // const errorCode = error.code;
    // const errorMessage = error.message;
  }
};

export const logOut = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await firebaseSignOut(auth);
      dispatch(authActions.logout());
    } catch (error) {
      // Notification with error can't create new user
      // const errorCode = error.code;
      // const errorMessage = error.message;
    }
  };
};
