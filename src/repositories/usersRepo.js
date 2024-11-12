import { db } from "../firebaseConfig"
import { collection, getDocs } from "firebase/firestore"

const usersCollection = collection(db, "users");

class UsersRepo {
    getAllUsers = () => {
        return getDocs(usersCollection);
    }
}

export default new UsersRepo();