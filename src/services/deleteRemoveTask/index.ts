import { BASE_URL } from '../config';
import axios, { AxiosResponse } from "axios";
import { ITask } from '../../pages/App';

export const deleteRemoveTask = (id: string): Promise<AxiosResponse<ITask>> => {
    return axios.delete(`${BASE_URL}/api/tasks/delete`, {
        params: {
            id
        }
    })
}