import axios, { AxiosResponse } from "axios";
import { ITask } from "../../pages/App";
import { BASE_URL } from "../config";

export const getTasks = (useruid: string): Promise<AxiosResponse<ITask[]>> => {
    return axios.get(`${BASE_URL}/api/tasks`, {
        headers: {
            useruid: useruid
        }
    })
}