import { ITask } from '../../App';
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
}

export const Week = ({ week }: WeekProps) => {
    return (
        <div className={styles.week}>
            {
                week.days.map((day) => (
                    <Day day={day} />
                ))
            } 
        </div>
    )
}