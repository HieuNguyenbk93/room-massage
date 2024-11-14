import { addDoc, collection, getDocs, limit, orderBy, query, startAt } from "firebase/firestore"
import { db } from "../firebaseConfig"

const logRef = collection(db, "log")

class LogRepo {
    async getLog(pageSize, pageIndex) {
        const q = query(logRef,
            orderBy('timeCheckin', 'desc')
        );
        const snapshot = await getDocs(q);
        const total = snapshot.docs.length;
        const index = pageSize * pageIndex + 1;
        const lastVisible = snapshot.docs[index - 1];
        const next = query(logRef,
            orderBy('timeCheckin', 'desc'),
            startAt(lastVisible),
            limit(pageSize)
        );
        const querySnapshot = await getDocs(next);
        return {
            total: total,
            data: querySnapshot
        }
    }

    createLog(log) {
        return addDoc(logRef, log);
    }
}

export default new LogRepo();