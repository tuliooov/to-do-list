import styles from './Header.module.css';

import rocketIcon from '../../assets/rocket.svg';
import { BiExit } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useUserContext } from '../../contexts/UserProvider';
import { Loading } from '../Loading';

export function Header() {
  const { handleChangeUser, user} = useUserContext()
  const navigate = useNavigate();

  const onExit = () => {
    signOut(auth)
      .then(() => {
        handleChangeUser()
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode} - ${errorMessage}`)
      });
  }

  return (
    <header className={styles.header} >
      <div className={styles.nav}>
        {user && <>
          <p>{user.displayName || user.email}</p>
          <button className={styles.buttonExit} onClick={onExit}><BiExit size={18} /> </button>
        </>}
      </div>
      <div className={styles.logo}>
        <img src={rocketIcon} alt="Rocket" />
        <div>
          <span>to</span>
          <span>do</span>
        </div>
      </div>
    </header>
  ); 
}