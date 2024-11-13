import UsersService from "../services/usersService";

// export const GetAllUsers = () => {
//     return UsersService.getAllUsers();
// }

class UsersController {
    GetAllUsers = async () => {
        try {
            const result = await UsersService.getAllUsers();
            return {
                data: result,
                ok: true
            }
        }
        catch (error) {
            return {
                meassage: error,
                ok: false
            }
        }
    }

    GetByUserName = async (userName) => {
        try {
            const result = await UsersService.getByUserName(userName);
            return {
                data: result,
                ok: true
            }
        }
        catch (error) {
            return {
                meassage: error,
                ok: false
            }
        }
    }

    GetByUserId = async (userId) => {
        try {
            const result = await UsersService.getUserById(userId);
            return {
                data: result,
                ok: true
            }
        } catch (error) {
            return {
                meassage: error,
                ok: false
            }
        }
    }

    DeleteUser = async (userId) => {
        try {
            await UsersService.deleteUser(userId);
            return {
                ok: true
            }
        } catch (error) {
            return {
                meassage: error,
                ok: false
            }
        }
    }

    CreateUser = async (user) => {
        try {
            await UsersService.createUser(user);
            return {
                ok: true
            }
        }
        catch (error) {
            return {
                meassage: error,
                ok: false
            }
        }
        
    }

    UpdateUser = async (id, user) => {
        try {
            await UsersService.updateUser(id, user);
            return {
                ok: true
            }
        }
        catch (error) {
            // console.log(error);
            return {
                meassage: error,
                ok: false
            }
        }
        
    }
}

export default new UsersController();