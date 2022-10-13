import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
} from "firebase/auth";
import { AppDispatch } from "..";
import db, { app } from "../../config/firebase.config";
import { authActions } from "./auth-slice";
import isFirebaseError, {
  getFirebaseErrorMessage,
} from "../../models/firebaseErrorCode";
import { doc, setDoc } from "firebase/firestore";
import { passwordCardsActions } from "../dashboard/password-cards-slice";

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
      const uid = auth!.currentUser!.uid;
      await setDoc(doc(db, "users", uid), {});
      // await addDoc(collection(db, `users/${uid}/passwords-cards`), {});
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
      dispatch(passwordCardsActions.changeValueByLogout());
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
