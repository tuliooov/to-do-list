import { useState } from 'react';
import { Button } from './Button';
import styles from './NewTask.module.css';
import plusIcon from '../assets/plus.svg';

interface NewTaskProps {
  createTask: (text: string) => Promise<void>
  isLoading: boolean
}

export function NewTask({ createTask, isLoading }: NewTaskProps) {
  const [text, setText] = useState('');

  function handleCreateTask() {
    event?.preventDefault()
    if(text){
      createTask(text);
      setText('');
    }
  }

  return (
    <form className={styles.wrapper} onSubmit={handleCreateTask}>
      <input 
        className={styles.input}
        placeholder="Adicione uma nova tarefa"
        value={text}
        onChange={(event) => setText(event.target.value)} 
      />

      <Button loading={isLoading} >
        Criar
        <img src={plusIcon} alt={'Mais'} />
      </Button>
    </form>
  );
}