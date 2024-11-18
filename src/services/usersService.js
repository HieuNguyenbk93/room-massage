import UsersRepo from "../repositories/usersRepo";

class UsersService {
    async getAllUsers() {
        try {
            const data = await UsersRepo.getAllUsers();
            const usersData = data.docs.map(user => {
                let _user = JSON.parse(JSON.stringify(user.data()));
                let item = {
                    ..._user,
                    id: user.id
                }
                return item;
            });
            return {
                data: usersData,
                success: true,
            }
        }
        catch (error) {
            return {
                message: error,
                success: false,
            }
        }
        
    }

    async getByUserName(userName) {
        try {
            const data = await UsersRepo.getByUserName(userName);
            console.log(data);
            const usersData = data.docs.map(user => {
                let _user = JSON.parse(JSON.stringify(user.data()));
                let item = {
                    ..._user,
                    id: user.id
                }
                return item;
            });
            return {
                data: usersData,
                success: true,
            }
        } catch (error) {
            return {
                message: error,
                success: false,
            }
        }
    }

    async getUserById(userId) {
        try {
            const data = await UsersRepo.getByUserId(userId);
            return {
                data: data.data(),
                success: true
            }
        } catch (error) {
            return {
                message: error,
                success: false,
            }
        }
        
    }

    async deleteUser(userId) {
        try {
            await UsersRepo.deleteUser(userId);
            return {
                success: true
            }
        } catch (error) {
            return {
                message: error,
                success: false,
            }
        }
    }

    async createUser(user) {
        try {
            await UsersRepo.addUser(user);
            return {
                success: true
            }
        } catch (error) {
            return {
                message: error,
                success: false,
            }
        }
    }

    async updateUser(id, user) {
        try {
            await UsersRepo.updateUser(id, user);
            return {
                success: true
            }
        } catch (error) {
            return {
                message: error,
                success: false,
            }
        }
    }
}

export default new UsersService();