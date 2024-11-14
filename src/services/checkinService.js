// import { query } from "firebase/firestore";
import LogRepo from "../repositories/logRepo";
import UsersRepo from "../repositories/usersRepo";

class CheckinService {
    async checkinUser(userId) {
        const userResult = await UsersRepo.getByUserId(userId);
        let user = userResult.data();
        user.countRoom--;
        await UsersRepo.updateUser(userId, user);
        const log = {
            userId: userId,
            timeCheckin: new Date()
        }
        await LogRepo.createLog(log)
    }

    async getHisCheckin(pageSize, pageIndex) {
        const data = await LogRepo.getLog(pageSize, pageIndex);
        const total = data.total;
        const logData = data.data.docs.map((log, index) => {
            let item = {...log.data()};
            item.time = item.timeCheckin.toDate().toLocaleString();
            item.index = pageSize * pageIndex + index + 1;
            // const user = UsersRepo.getByUserId(item.userId);
            // item.userName = user.data().name;
            return item;
        });
        return {
            total: total,
            data: logData
        };
    }
}

export default new CheckinService();