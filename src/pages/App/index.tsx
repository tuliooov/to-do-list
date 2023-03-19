import { useEffect, useState } from 'react';
import '../../global.css';
import styles from './App.module.css';
import { Header } from '../../components/Header';
import { NewTask } from '../../components/NewTask';
import { Tasks } from '../../components/Tasks';
import { postCreateTask } from '../../services/postCreateTask';
import { getTasks } from '../../services/getTasks';
import { patchDoneTask } from '../../services/patchCheckTask';
import { deleteRemoveTask } from '../../services/deleteRemoveTask';
import { Resume } from '../../components/Resume';
import { useUserContext } from '../../contexts/UserProvider';

export interface ITask {
  id: string
  title: string
  description: string
  createdAt: string
  done: boolean
}



export enum EResponseType {
  SUCCESS,
  FAILED,
  LOADING,
  FETCHING
}

export interface IResponseType {
  status: EResponseType
  message?: string
}

export function App() {
  const { user } = useUserContext()

  const [tasks, setTasks] = useState<ITask[]>([]);
  const [responseType, setResponseType] = useState<IResponseType>({
    status: EResponseType.LOADING
  })

  const createTask = async (title: string) => {
    if(user?.uid){
      const newTask = {
        title: title,
        description: ''
      }
      const response = await postCreateTask(newTask, user.uid)
      setTasks((state) => [...state, response.data]);
    }
  }

   const doneTask = async (id: string, done: boolean) => {
    try {
      patchDoneTask({
        id,
        done
      })
      const updatedTasks = tasks.map(task => {
        if(task.id === id) {
          return {
            ...task,
            done
          }
        } else {
          return task;
        }
      });
      setTasks(updatedTasks);
    } catch (error) {
      console.error(error);
    }
  }

  function deleteTask(id: string) {
    deleteRemoveTask(id)
    const updatedTasks = tasks.filter(task => {
      return task.id !== id;
    })

    setTasks(updatedTasks);
  }


  const fetchTasks = async () => {
    if(user){
      try {
        const response = await getTasks(user.uid)
        setTasks(response.data)
        setResponseType({
          status: EResponseType.SUCCESS
        })
      } catch (error) {
        setResponseType({
          status: EResponseType.FAILED,
          message: `${JSON.stringify(error)}`
        })
      }
    }
    
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const tasksFilterd = tasks.filter((task) => new Date(task.createdAt).toLocaleDateString() === new Date().toLocaleDateString())

  return (
    <div>
      <main className={styles.main}>
        <NewTask createTask={createTask} />

        {
          responseType.status === EResponseType.LOADING && (
            <p>CARREGANDO...</p>
          )
        }

        {
          responseType.status === EResponseType.SUCCESS && (
            <>
              <Tasks tasks={tasksFilterd} doneTask={doneTask} deleteTask={deleteTask}/>
              <Resume tasks={tasks} />
            </>
          )
        }

        {
          responseType.status === EResponseType.FAILED && (
            <p>{responseType.message}</p>
          )
        }
        
      </main>
    </div>
  );
}