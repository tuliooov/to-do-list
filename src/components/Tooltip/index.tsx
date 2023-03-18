import  styles from './Tooltip.module.css';

interface TooltipProps {
    children: React.ReactNode
    title: string
}

export const Tooltip = ({ children, title = 'Tooltip text' }: TooltipProps) => {
      return (
        <div className={styles.tooltip} >
            <span className={styles.tooltiptext} >{title}</span>
            {children}
        </div>
      )
}