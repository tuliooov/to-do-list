import { useState } from 'react';
import styles from './RegisterForm.module.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../lib/firebase'
import { IUser, useUserContext } from '../../contexts/UserProvider';
import { Link, useNavigate } from 'react-router-dom';

interface NewTaskProps {

}

export function RegisterForm({  }: NewTaskProps) {
  const { handleChangeUser, user} = useUserContext()
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleRegister() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user as IUser
        handleChangeUser(user)
        setName('');
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
          placeholder="Nome"
          value={name}
          required
          onChange={(event) => setName(event.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Email"
          type={"email"}
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)} 
        />
        <input 
          className={styles.input}
          placeholder="Senha"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)} 
        />
        <button
          type='submit'
          className={styles.button}
          onClick={handleRegister}
        >
          Registrar
        </button>
      </div>
      <Link
        className={styles.link}
        to={{
          pathname: '/login',
        }}
      >
        Já tenho conta
      </Link>
    </div>
  );
}