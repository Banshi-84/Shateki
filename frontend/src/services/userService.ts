import { collection, getDocs, query, where, updateDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const USERS_COLLECTION = "users";

export const checkUserExists = async (username: string): Promise<boolean> => {
  const usersRef = collection(db, USERS_COLLECTION);
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

export const createUser = async (username: string): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, username);
  await setDoc(userRef, {
    username,
    highScore: 0,
  });
};

export const updateUserScore = async (username: string, score: number): Promise<void> => {
  const userRef = doc(db, USERS_COLLECTION, username);
  await updateDoc(userRef, {
    highScore: score,
  });
};