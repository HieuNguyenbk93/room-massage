import UsersRepo from "../repositories/usersRepo";

class UsersService {
    async getAllUsers() {
        const data = await UsersRepo.getAllUsers();
        const usersData = data.docs.map(user => {
            let _user = JSON.parse(JSON.stringify(user.data()));
            let item = {
                ..._user,
                id: user.id
            }
            return item;
        })
        return usersData;
    }
}

export default new UsersService();