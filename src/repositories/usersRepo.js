import { db } from "../firebaseConfig"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"

const usersCollection = collection(db, "users");

class UsersRepo {
    getAllUsers = () => {
        return getDocs(usersCollection);
    }

    getByUserId = (userId) => {
        // const q = query(usersCollection, where("name", "==", "Nguyen Hieu"));
        const docRef = doc(db, "users", userId);
        return getDoc(docRef);
    }

    deleteUser = (userId) => {
        const docRef = doc(db, "users", userId);
        return deleteDoc(docRef);
    }

    addUser = (user) => {
        return addDoc(usersCollection, user);
    }

    updateUser = (id, user) => {
        const docRef = doc(db, "users", id);
        return updateDoc(docRef, user);
    }
}

export default new UsersRepo();