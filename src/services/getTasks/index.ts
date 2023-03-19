import axios, { AxiosResponse } from "axios";
import { ITask } from "../../pages/App";
import { BASE_URL } from "../config";

export const getTasks = (): Promise<AxiosResponse<ITask[]>> => {
    return axios.get(`${BASE_URL}/api/tasks`)
}