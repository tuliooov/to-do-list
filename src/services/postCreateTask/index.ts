import { BASE_URL } from './../config';
import axios, { AxiosResponse } from "axios";
import { ITask } from "../../App";

interface INewTask {
    title: string;
    description: string;
}

export const postCreateTask = (data: INewTask): Promise<AxiosResponse<ITask>> => {
    return axios.post(`${BASE_URL}/api/tasks/create`, data)
}