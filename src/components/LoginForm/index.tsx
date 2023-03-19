import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { IUser, useUserContext } from '../../contexts/UserProvider';
import { auth } from '../../lib/firebase';
import { Link } from 'react-router-dom'

import styles from './LoginForm.module.css';

interface NewTaskProps {

}

export function LoginForm({  }: NewTaskProps) {
  const { handleChangeUser, user} = useUserContext()
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user as IUser 
        handleChangeUser(user)
        setEmail('');
        setPassword('');
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode} - ${errorMessage}`)
      });
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <input 
          className={styles.input}
          placeholder="Email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)} 
          type="email"
        />
        <input 
          className={styles.input}
          placeholder="Senha"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)} 
          type="password"
        />
        <button
          type='submit'
          className={styles.button}
          onClick={handleLogin}
        >
          Logar
        </button>
      </div>
      <Link
        className={styles.link}
        to={{
          pathname: '/register',
        }}
      >
        Criar conta
      </Link>
    </div>
  );
}