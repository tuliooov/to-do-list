import { ITask } from '../../App';
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
    const tasksChecked = day.tasks.filter(task=>task.checked)
    const messageTooltip = `${day.date} - ${tasksChecked.length}/${day.tasks.length} tarefas`
    return (
    <Tooltip title={messageTooltip}>
        <div className={styles.day} style={{
            opacity: getOpacity(tasksChecked.length)
        }} />
    </Tooltip>
    )
}