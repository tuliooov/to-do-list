import  styles from './Resume.module.css';
import { subDays } from 'date-fns';
import { Week } from '../Week';
import { Subtitle } from '../Subtitle';
import { ITask } from '../../pages/App';

interface ResumeProps {
    tasks: ITask[]
}

export const Resume = ({ tasks }: ResumeProps) => {
    const getTasksOfTheDay = (subDate: Date) => tasks.filter((task) => new Date(task.createdAt).toLocaleDateString() === subDate.toLocaleDateString())
    
    let refDay = 0
    const weekSize = 24
    const weekLenght = 7
    const today = new Date()

    const arrayDays = [...Array(weekSize).keys()].map((_iWeek) => {
        const weekIndex = _iWeek + 1
        return ({
            week: weekIndex,
            days: [...Array(weekLenght).keys()].map((_iDay) => {
                const subDate = subDays(today, refDay);
                refDay += 1
                return ({
                    date: subDate.toLocaleDateString(),
                    time: subDate.getTime(),
                    tasks: getTasksOfTheDay(subDate)
                });
            }).reverse()
        });
    }).reverse()

    return (
        <div className={styles.resume}>
            <div className={styles.weeks}>
                {
                    arrayDays.map((week) => (
                        <Week week={week} />
                    ))
                }
            </div>

            <Subtitle />
        </div>
    )
}