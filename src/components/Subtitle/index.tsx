import { getOpacity } from '../../utils';
import { Day } from '../Day';
import { Tooltip } from '../Tooltip';
import  styles from './Subtitle.module.css';


export const Subtitle = () => {
    return (
        <div className={styles.subtitle}>
            <Tooltip title={`0 tarefa concluída`}>
                <div className={styles.day} style={{
                    opacity: getOpacity(0)
                }} />
            </Tooltip>  
            <Tooltip title={`2 a 3 tarefas concluídas`}>
                <div className={styles.day} style={{
                    opacity: getOpacity(2)
                }} />
            </Tooltip>  
            <Tooltip title={`4 a 5 tarefas concluídas`}>
                <div className={styles.day} style={{
                    opacity: getOpacity(4)
                }} />
            </Tooltip>  
            <Tooltip title={`6 a 7 tarefas concluídas`}>
                <div className={styles.day} style={{
                    opacity: getOpacity(6)
                }} />
            </Tooltip>  
            <Tooltip title={`8 a 9 tarefas concluídas`}>
                <div className={styles.day} style={{
                    opacity: getOpacity(8)
                }} />
            </Tooltip>  
            <Tooltip title={`Mais de 10 tarefas concluídas`}>
                <div className={styles.day} style={{
                    opacity: getOpacity(10)
                }} />
            </Tooltip>  
        </div>
    )
}