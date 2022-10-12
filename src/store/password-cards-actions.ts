import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

import { AppDispatch } from ".";
import db from "../config/firebase.config";
import { passwordCardsActions } from "./password-cards-slice";

const auth = getAuth();

export const fetchPasswordCardsData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const userCollectionRef = collection(
        db,
        `users/${auth.currentUser?.uid}/password-cards`
      );
      const userDataResponse = await getDocs(userCollectionRef);

      if (userDataResponse.docs.length === 0) {
        return { items: [] };
        // return [];
      } else {
        userDataResponse.docs.forEach((item) => {
          console.log(item.data);
          //   return {
          //     id: item.id,
          //     serviceName: item.data,
          //   };
        });
      }

      return { items: [] };
      //   return userDataResponse.docs;
    };

    try {
      const passwordCardsData = await fetchData();

      dispatch(
        passwordCardsActions.replaceCards({
          items: passwordCardsData.items || [],
        })
      );
    } catch (error) {
      // Notification with fetch data error
    }
  };
};
