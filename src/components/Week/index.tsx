import { memo } from 'react';
import { ITask } from '../../pages/App';
import { Day } from '../Day';
import  styles from './Week.module.css';


interface WeekProps {
    week: {
        week: number;
        days: {
            date: string;
            time: number;
            tasks: ITask[];
        }[];
    }
    handleSelectTasksResume: (selecteds?: ITask[]) => () => void
}

export const Week = memo(({ week, handleSelectTasksResume }: WeekProps) => {
    return (
        <div className={styles.week}>
            {
                week.days.map((day) => (
                    <Day key={day.time} day={day} handleSelectTasksResume={handleSelectTasksResume} />
                ))
            } 
        </div>
    )
})