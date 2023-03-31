import { useState } from 'react';
import styles from './RegisterForm.module.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../lib/firebase'
import { IUser, useUserContext } from '../../contexts/UserProvider';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../Button';

interface NewTaskProps {

}

export function RegisterForm({  }: NewTaskProps) {
  const { handleChangeUser, user} = useUserContext()
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleUpdateUser() {
      if(auth.currentUser && user){
        updateProfile(auth.currentUser, {
          displayName: name
        }).then(() => {
          handleChangeUser({...user, displayName: name})
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode} - ${errorMessage}`)
        });
      }
  }

  function handleRegister() {
    event?.preventDefault()
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user as IUser
        handleChangeUser(user)
        handleUpdateUser()
        setName('');
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
    <form onSubmit={handleRegister}>
      <div className={styles.main}>
        <div className={`${styles.wrapper} row`}>
          <div className='col-3 col-s-12'>
            <input 
              className={styles.input}
              placeholder="Nome"
              value={name}
              required
              onChange={(event) => setName(event.target.value)} 
            />
          </div>
          <div className='col-3 col-s-12'>
            <input 
              className={styles.input}
              placeholder="Email"
              type={"email"}
              value={email}
              required
              onChange={(event) => setEmail(event.target.value)} 
            />
          </div>
          <div className='col-3 col-s-12'>
            <input 
              className={styles.input}
              placeholder="Senha"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)} 
              type="password"
            />
          </div>
          <div className='col-3 col-s-12'>
            <Button loading={isLoading} className="s-w-full w-full">
              Registrar
            </Button>
          </div>
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
    </form>
  );
}