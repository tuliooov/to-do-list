import { memo } from 'react';
import { ITask } from '../../pages/App';
import { getOpacity } from '../../utils';
import { Tooltip } from '../Tooltip';
import  styles from './Day.module.css';

interface DayProps {
    day: {
        date: string;
        time: number;
        tasks: ITask[];
    }
    handleSelectTasksResume: (selecteds?: ITask[]) => () => void
}
export const Day = memo(({ day, handleSelectTasksResume }: DayProps) => {
    const tasksDone = day.tasks.filter(task=>task.done)
    const messageTooltip = `${day.date} - ${tasksDone.length}/${day.tasks.length} tarefas`
    return (
    <Tooltip title={messageTooltip}>
        <button 
            className={styles.day} 
            style={{
                opacity: getOpacity(tasksDone.length),
                cursor: day.tasks.length ? 'pointer' : 'auto'
            }}
            onClick={handleSelectTasksResume(day.tasks)}
        >
            {tasksDone.length}
        </button>
    </Tooltip>
    )
})