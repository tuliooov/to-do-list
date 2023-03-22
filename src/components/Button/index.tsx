import styles from './Button.module.css';
import { Loading } from '../Loading';

interface ButtonProps {
  loading?: boolean
  children: React.ReactNode
}
export function Button({loading, children}: ButtonProps) {
  return (
    <button
      className={styles.button}
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