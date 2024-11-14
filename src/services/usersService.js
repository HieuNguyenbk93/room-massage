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

    async getByUserName(userName) {
        const data = await UsersRepo.getByUserName(userName);
        console.log(data);
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

    async getUserById(userId) {
        const data = await UsersRepo.getByUserId(userId);
        return data.data();
    }

    async deleteUser(userId) {
        await UsersRepo.deleteUser(userId);
    }

    async createUser(user) {
        await UsersRepo.addUser(user);
    }

    async updateUser(id, user) {
        await UsersRepo.updateUser(id, user);
    }
}

export default new UsersService();