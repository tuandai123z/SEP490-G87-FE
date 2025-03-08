import { toast } from "react-toastify";
import { axiosInstance } from "../../utils/axiosInstant";

export function useManageStaff() {

    const getListStaff = async () => {
        await axiosInstance
            .get(`/employees`)
            .then(res => {
                const data = res.data.result;
                return data;
            })
            .catch((err) => {
                if (err.response) {
                    const errorRes = err.response.data;
                    toast.error(errorRes.message);
                } else if (err.request) {
                    toast.error(err.request);
                } else {
                    toast.error(err.message);
                }
                return null;
            });
        return null
    }

    const getListRole = async () => {
        await axiosInstance
            .get('/roles/find-all')
            .then(res => {
                const data = res.data;
                return data
            })
            .catch((err) => {
                if (err.response) {
                    const errorRes = err.response.data;
                    toast.error(errorRes.message);
                } else if (err.request) {
                    toast.error(err.request);
                } else {
                    toast.error(err.message);
                }
                return null;

            });
        return null
    }

    return { getListStaff, getListRole }
}