import { HTTP_STATUS } from "../constants/httpStatus";
import CheckinService from "../services/checkinService";

class CheckinController {
    CheckinByUserId = async (userId) => {
        try {
            const result = await CheckinService.checkinUser(userId);
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
        catch(error) {
            return {
                meassage: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
    }

    GetLogCheckin = async (pageSize, pageIndex) => {
        try {
            const result = await CheckinService.getHisCheckin(pageSize, pageIndex);
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
                meassage: error,
                status: HTTP_STATUS.INTERNAL_SERVER_ERROR
            }
        }
    }
}

export default new CheckinController();