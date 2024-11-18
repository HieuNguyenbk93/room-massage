import { HTTP_STATUS } from "../constants/httpStatus";
import UsersService from "../services/usersService";

// export const GetAllUsers = () => {
//     return UsersService.getAllUsers();
// }

class UsersController {
    GetAllUsers = async () => {
        try {
            const result = await UsersService.getAllUsers();
            if (result.success) {
                return {
                    data: result.data,
                    status: HTTP_STATUS.OK
                }
            }
            else {
                return {
                    message: result.message,
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR
                }
            }
            
        }
        catch (error) {
            return {
                message: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
    }

    GetByUserName = async (userName) => {
        try {
            const result = await UsersService.getByUserName(userName);
            if (result.success) {
                return {
                    data: result.data,
                    status: HTTP_STATUS.OK
                }
            }
            else {
                return {
                    message: result.message,
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR
                }
            }
        }
        catch (error) {
            return {
                message: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
    }

    GetByUserId = async (userId) => {
        try {
            const result = await UsersService.getUserById(userId);
            if (result.success) {
                return {
                    data: result.data,
                    status: HTTP_STATUS.OK
                }
            }
            else {
                return {
                    message: result.message,
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR
                }
            }
            
        } catch (error) {
            return {
                message: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
    }

    DeleteUser = async (userId) => {
        try {
            const result = await UsersService.deleteUser(userId);
            if (result.success) {
                return {
                    status: HTTP_STATUS.OK
                }
            } else {
                return {
                    message: result.message,
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR
                }
            }
        } catch (error) {
            return {
                meassage: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
    }

    CreateUser = async (user) => {
        try {
            const result = await UsersService.createUser(user);
            if (result.success) {
                return {
                    status: HTTP_STATUS.OK
                }
            } else {
                return {
                    message: result.message,
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR
                }
            }
        }
        catch (error) {
            return {
                meassage: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
        
    }

    UpdateUser = async (id, user) => {
        try {
            const result = await UsersService.updateUser(id, user);
            if (result.success) {
                return {
                    status: HTTP_STATUS.OK
                }
            } else {
                return {
                    message: result.message,
                    status: HTTP_STATUS.INTERNAL_SERVER_ERROR
                }
            }
        }
        catch (error) {
            return {
                meassage: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
        
    }
}

export default new UsersController();