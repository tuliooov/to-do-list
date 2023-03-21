import styles from './Button.module.css';
import plusIcon from '../../assets/plus.svg';
import { Loading } from '../Loading';

interface ButtonProps {
  loading?: boolean
}
export function Button({loading}: ButtonProps) {
  return (
    <button
      className={styles.button}
      type="submit"
    >
        <div style={!loading ? { opacity: 0 } : {}}>
          <Loading />
        </div>
        <span style={loading ? { opacity: 0 } : {}}>
          Criar
          <img src={plusIcon} alt="Mais" />
        </span>
    </button>
  ); 
}