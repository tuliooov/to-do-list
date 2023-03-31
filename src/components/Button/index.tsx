import styles from './Button.module.css';
import { Loading } from '../Loading';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  loading?: boolean
  children: React.ReactNode
}

export function Button({loading, children, className, ...rest}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${className}`}
      {...rest}
      type="submit"
    >
        <div style={!loading ? { opacity: 0 } : {}}>
          <Loading />
        </div>
        <span style={loading ? { opacity: 0 } : {}}>
          {children}
        </span>
    </button>
  ); 
}