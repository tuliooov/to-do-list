import { BASE_URL } from '../config';
import axios, { AxiosResponse } from "axios";
import { ITask } from "../../App";

interface INewTask {
    id: string;
    done: boolean;
}

export const patchDoneTask = (data: INewTask): Promise<AxiosResponse<ITask>> => {
    return axios.patch(`${BASE_URL}/api/tasks/done`, data)
}