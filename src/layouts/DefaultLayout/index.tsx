import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header';
import styles from './DefaultLayout.module.css';

export function DefaultLayout() {
  return (
    <>
      <Header></Header>
      <div className={styles.layout}>
        <Outlet />
      </div>
    </>
  )
}
