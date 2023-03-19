import { ITask } from '../App';
import { Task } from './Task';

import  styles from './Tasks.module.css';

interface TasksProps {
  tasks: ITask[],
  doneTask: (id: string, done: boolean) => void;
  deleteTask: (id: string) => void;
}

export function Tasks({ tasks, doneTask, deleteTask }: TasksProps) {
  const createdTasks = tasks.length;

  const tasksCompleted = tasks.reduce((acc, task) => {
    if(task.done) {
      return acc + 1
    }
    return acc;
  }, 0);

  return (
    <div className={styles.tasks}>
      <div className={styles.info}>
        <div className={styles.created}>
          <strong>Tarefas criadas</strong>
          <span>{createdTasks}</span>
        </div>
        <div className={styles.done}>
          <strong>Concluídas</strong>
          <span>{tasksCompleted} de {createdTasks}</span>
        </div>
      </div>

      { createdTasks
        ? 
          tasks.map(task => (
            <Task 
              key={task.id} 
              task={task} 
              doneTask={doneTask}
              deleteTask={deleteTask}
            />
          ))
        :
          <div className={styles.empty}>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
      }
    </div>
  );
}