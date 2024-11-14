import CheckinService from "../services/checkinService";

class CheckinController {
    CheckinByUserId = async (userId) => {
        try {
            await CheckinService.checkinUser(userId);
            return {
                ok: true
            }
        }
        catch(error) {
            return {
                meassage: error,
                ok: false
            }
        }
    }

    GetLogCheckin = async (pageSize, pageIndex) => {
        try {
            const result = await CheckinService.getHisCheckin(pageSize, pageIndex);
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
}

export default new CheckinController();