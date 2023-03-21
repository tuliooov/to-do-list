import  styles from './Resume.module.css';
import { subDays, differenceInWeeks } from 'date-fns';
import { Week } from '../Week';
import { Subtitle } from '../Subtitle';
import { ITask } from '../../pages/App';

interface ResumeProps {
    tasks: ITask[]
}

export const Resume = ({ tasks }: ResumeProps) => {

    if(tasks.length === 0){
        return null
    }

    const getTasksOfTheDay = (subDate: Date) => tasks.filter((task) => new Date(task.createdAt).toLocaleDateString() === subDate.toLocaleDateString())
    
    const firstTask = new Date(tasks[0].createdAt)
    
    let refDay = 0
    const today = new Date()
    const weekDifference = differenceInWeeks(firstTask, today) + 1
    const weekSize = weekDifference > 24 ? weekDifference : 24
    const weekLenght = 7

    


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
            })
        });
    })

    return (
        <div className={styles.resume}>
            <div className={styles.created}>
                <strong>Histórico de tarefas</strong>
            </div>
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