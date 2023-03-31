import  styles from './Resume.module.css';
import { subDays, differenceInWeeks } from 'date-fns';
import { Week } from '../Week';
import { Subtitle } from '../Subtitle';
import { ITask } from '../../pages/App';
import { DialogDayResume } from '../DialogDayResume';
import { useMemo, useState } from 'react';

interface ResumeProps {
    tasks: ITask[]
}

export const Resume = ({ tasks }: ResumeProps) => {

    const [selectedTasksResume, setSelectedTasksResume] = useState<ITask[]>()

    const handleSelectTasksResume = (selecteds?: ITask[]) => () => {
        if(selecteds?.length){
            setSelectedTasksResume(selecteds)
        }
    }

    const onCloseResumeTasks = () => {
        setSelectedTasksResume(undefined)
    }

    if(tasks.length === 0){
        return null
    }

    const getTasksOfTheDay = useMemo(() => (subDate: Date) => tasks.filter((task) => new Date(task.createdAt).toLocaleDateString() === subDate.toLocaleDateString()), [tasks])
    
    const firstTask = new Date(tasks[0].createdAt)
    
    let refDay = 0
    const today = new Date()
    const weekDifference = differenceInWeeks(firstTask, today) + 1
    const weekSize = weekDifference > 24 ? weekDifference : 24
    const weekLenght = 7

    const arrayDays = useMemo(() => [...Array(weekSize).keys()].map((_iWeek) => {
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
    }), [weekSize, weekLenght, getTasksOfTheDay])

    return (
        <div className={styles.resume}>
            <div className={styles.created}>
                <strong>Histórico de tarefas</strong>
            </div>
            <div className={styles.weeks}>
                {
                    arrayDays.map((week) => (
                        <Week key={week.week} week={week} handleSelectTasksResume={handleSelectTasksResume} />
                    ))
                }
            </div>

            <DialogDayResume tasks={selectedTasksResume} onClose={onCloseResumeTasks}/>
            <Subtitle />
        </div>
    )
}