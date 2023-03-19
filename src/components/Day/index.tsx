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
}
export const Day = ({ day }: DayProps) => {
    const tasksDone = day.tasks.filter(task=>task.done)
    const messageTooltip = `${day.date} - ${tasksDone.length}/${day.tasks.length} tarefas`
    return (
    <Tooltip title={messageTooltip}>
        <div className={styles.day} style={{
            opacity: getOpacity(tasksDone.length)
        }} />
    </Tooltip>
    )
}