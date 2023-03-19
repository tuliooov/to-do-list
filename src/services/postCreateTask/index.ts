import { BASE_URL } from './../config';
import axios, { AxiosResponse } from "axios";
import { ITask } from '../../pages/App';

interface INewTask {
    title: string;
    description: string;
}

export const postCreateTask = (data: INewTask, useruid: string): Promise<AxiosResponse<ITask>> => {
    return axios.post(`${BASE_URL}/api/tasks/create`, data, {
        headers: {
            useruid: useruid
        }
    })
}