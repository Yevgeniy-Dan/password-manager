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
      } else {
        dispatch(authActions.logout());
      }
    });
  };
};

export const signIn = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      dispatch(authActions.login());
    } catch (error) {
      // Notification with error can't create new user
      // const errorCode = error.code;
      // const errorMessage = error.message;
    }
  };
};

export const logIn = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(authActions.login());
    } catch (error) {
      // Notification with error can't create new user
      // const errorCode = error.code;
      // const errorMessage = error.message;
    }
  };
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
