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
import isFirebaseError, {
  getFirebaseErrorMessage,
} from "../models/firebaseErrorCode.";

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

export const signIn = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (isFirebaseError(error)) {
        console.log(error.code, error.message);
        dispatch(
          authActions.showError({
            message: getFirebaseErrorMessage(error.code),
          })
        );
      }
    }
  };
};

export const logIn = (email: string, password: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (isFirebaseError(error)) {
        dispatch(
          authActions.showError({
            message: getFirebaseErrorMessage(error.code),
          })
        );
      }
    }
  };
};

export const logOut = () => {
  return async (dispatch: AppDispatch) => {
    try {
      await firebaseSignOut(auth);
      dispatch(authActions.logout());
    } catch (error) {
      if (isFirebaseError(error)) {
        dispatch(
          authActions.showError({
            message: getFirebaseErrorMessage(error.code),
          })
        );
      }
    }
  };
};
