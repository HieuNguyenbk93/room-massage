import UsersService from "../services/usersService";

// export const GetAllUsers = () => {
//     return UsersService.getAllUsers();
// }

class UsersController {
    GetAllUsers = () => {
        return UsersService.getAllUsers();
    }
}

export default new UsersController();