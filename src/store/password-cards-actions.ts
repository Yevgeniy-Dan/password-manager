import { async } from "@firebase/util";
import { getAuth } from "firebase/auth";
import {
  doc,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";

import { AppDispatch } from ".";
import db from "../config/firebase.config";
import PasswordCard from "../models/password-card";
import { passwordCardsActions } from "./password-cards-slice";

const auth = getAuth();

export const fetchPasswordCardsData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const userCollectionRef = collection(
        db,
        `users/${auth.currentUser?.uid}/password-cards`
      );
      const querySnapshot = await getDocs(userCollectionRef);

      if (querySnapshot.docs.length === 0) {
        return [];
      } else {
        const cards = querySnapshot.docs.map((item) => {
          return {
            id: item.id,
            serviceName: item.data().serviceName,
            password: item.data().password,
          };
        });
        return cards;
      }
    };

    try {
      const passwordCardsData: PasswordCard[] = await fetchData();

      dispatch(
        passwordCardsActions.replaceCards({
          items: passwordCardsData || [],
        })
      );
    } catch (error) {
      // Notification with fetch data error
    }
  };
};

export const sendPasswordCardsData = (cards: PasswordCard[]) => {
  return async (dispatch: AppDispatch) => {
    const sendRequest = async () => {
      const querySnapshot = await getDocs(
        collection(db, `users/${auth.currentUser?.uid}/password-cards`)
      );

      const editableData = cards.filter((card) =>
        querySnapshot.docs.some((doc) => card.id === doc.data().id)
      );
      const addableData = cards.filter(
        (card) => !querySnapshot.docs.some((doc) => card.id === doc.data().id)
      );
      const deletableData = querySnapshot.docs
        .filter((doc) => !cards.some((card) => doc.id === card.id))
        .map((card) => {
          return {
            id: card.id,
            serviceName: card.data().serviceName,
            password: card.data().password,
          };
        });

      let batch = writeBatch(db);

      addableData.forEach((item) => {
        let docRef = doc(
          collection(db, `users/${auth.currentUser?.uid}/password-cards`),
          item.id
        );
        batch.set(docRef, {
          serviceName: item.serviceName,
          password: item.password,
        });
      });

      editableData.forEach((item) => {
        let docRef = doc(
          collection(db, `users/${auth.currentUser?.uid}/password-cards`),
          item.id
        );
        batch.update(docRef, {
          serviceName: item.serviceName,
          password: item.password,
        });
      });

      deletableData.forEach((item) => {
        let docRef = doc(
          collection(db, `users/${auth.currentUser?.uid}/password-cards`),
          item.id
        );

        batch.delete(docRef);
      });

      await batch.commit();

      console.log(deletableData);
    };

    try {
      await sendRequest();
    } catch (error) {
      // Notification about error
    }
  };
};
