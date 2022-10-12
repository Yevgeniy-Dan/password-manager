import { FirebaseError } from "firebase-admin";

export enum FirebaseErrorCode {
  INVALID_EMAIL = "auth/invalid-email",
  USER_DISABLED = "auth/user-disabled",
  USER_NOT_FOUND = "auth/user-not-found",
  WRONG_PASSWORD = "auth/wrong-password",
  WEAK_PASSWORD = "auth/weak-password",
  ALREADY_IN_USE = "auth/email-already-in-use",
}

export default function isFirebaseError(
  error: unknown
): error is FirebaseError {
  return (error as FirebaseError).code !== undefined;
}

export const getFirebaseErrorMessage = (errorCode: string) => {
  switch (errorCode) {
    case FirebaseErrorCode.INVALID_EMAIL:
      return "The email address is not valid";
    case FirebaseErrorCode.USER_DISABLED:
      return "User corresponding to the given email has been disabled";
    case FirebaseErrorCode.USER_NOT_FOUND:
      return "Check your email";
    case FirebaseErrorCode.WRONG_PASSWORD:
      return "Check your password";
    case FirebaseErrorCode.WEAK_PASSWORD:
      return "Password should be at least 6 characters";
    case FirebaseErrorCode.ALREADY_IN_USE:
      return "Email already in use";
    default:
      return "Sorry. Something went wrong";
  }
};
