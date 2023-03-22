import { ITask } from '../../pages/App';
import styles from './DialogDayResume.module.css';
import { DialogSimple } from '../DialogSimple';

interface DialogDayResume {
  tasks?: ITask[]
  onClose: () => void
}

export const DialogDayResume = ({ tasks, onClose }: DialogDayResume) => {
  if(!tasks){
    return null
  }

  return (
    <DialogSimple open onClose={onClose} title={`Histórico de tarefas - ${new Date(tasks[0].createdAt).toLocaleDateString()}`}>
      <ul className={ styles.ul }>
          {
            tasks.map(task => (
              <li className={ styles.li } key={task.id}>
                  <div className={ task.done ? styles.radio_done : styles.radio_undone }>
                  {
                    task.done &&
                    <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.43107 0.342093L4.09914 4.67403L1.61667 2.19156L0.780762 3.02747L4.09914 6.34584L9.26698 1.178L8.43107 0.342093Z" fill="#F2F2F2"/>
                    </svg>  
                  }
                  </div> 
                  {task.title}
              </li>
            ))
          }
        </ul>
    </DialogSimple>
  )
}