import styles from './Header.module.css';

import rocketIcon from '../../assets/rocket.svg';
import { BiExit, BiHistory } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useUserContext } from '../../contexts/UserProvider';
import { Loading } from '../Loading';
import { DialogChanges } from '../DialogChanges';
import { useState } from 'react';

export function Header() {
  const { handleChangeUser, user} = useUserContext()
  const navigate = useNavigate();

  const [openChanges, setOpenChanges] = useState(false)

  const onChanges = () => {
    setOpenChanges(!openChanges)
  }

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
        <button className={styles.buttonIcon} onClick={onChanges}><BiHistory size={18} /> </button>
        {user && <div className={styles.user}>
          <p>{user.displayName || user.email?.slice(0, user.email?.indexOf('@'))}</p>
          <button className={styles.buttonIcon} onClick={onExit}><BiExit size={18} /> </button>
        </div>}
      </div>
      <div className={styles.logo}>
        <img src={rocketIcon} alt="Rocket" />
        <div>
          <span>to</span>
          <span>do</span>
        </div>
      </div>
      <DialogChanges open={openChanges} onClose={onChanges}/>
    </header>
  ); 
}