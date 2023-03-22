import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { IUser, useUserContext } from '../../contexts/UserProvider';
import { auth } from '../../lib/firebase';
import { Link } from 'react-router-dom'

import styles from './LoginForm.module.css';
import { Button } from '../Button';

interface NewTaskProps {

}

export function LoginForm({  }: NewTaskProps) {
  const { handleChangeUser} = useUserContext()
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    event?.preventDefault()
    setIsLoading(true)
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
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  return (
    <form onSubmit={handleLogin}>
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
          <Button loading={isLoading}>
            Logar
          </Button>
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
    </form>
  );
}