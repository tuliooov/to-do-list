import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { styled, keyframes } from '@stitches/react';
import { ITask } from '../../pages/App';
import { AiOutlineClose } from 'react-icons/ai'
import styles from './DialogDayResume.module.css';

interface DialogDayResume {
  tasks?: ITask[]
  onClose: () => void
}

export const DialogDayResume = ({ tasks, onClose }: DialogDayResume) => {
  if(!tasks){
    return null
  }
  
  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <DialogOverlay onClick={onClose}/>
        <DialogContent >
          <DialogTitle>Histórico de tarefas - {new Date(tasks[0].createdAt).toLocaleDateString()}</DialogTitle>
          <DialogDescription>
            <ul className={ styles.ul }>
              {
                tasks.map(task => (
                  <li className={ styles.li } key={task.id}>
                      <div className={ task.done ? styles.radio_done : styles.radio_undone }>
                      {
                        task.done &&
                        <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.43107 0.342093L4.09914 4.67403L1.61667 2.19156L0.780762 3.02747L4.09914 6.34584L9.26698 1.178L8.43107 0.342093Z" fill="#F2F2F2"/>
                        </svg>  
                      }
                      </div> 
                      {task.title}
                  </li>
                ))
              }
            </ul>
          </DialogDescription>
          <Dialog.Close asChild onClick={onClose}>
            <IconButton aria-label="Close" onClick={onClose}>
              <AiOutlineClose />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: 'var(--gray-700)',
  opacity: 0.5,
  position: 'fixed',
  inset: 0,
});

const DialogContent = styled(Dialog.Content, {
  backgroundColor: 'var(--gray-400)',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
});

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  fontSize: 17,
  color: 'var(--gray-200)',
});

const DialogDescription = styled(Dialog.Description, {
  margin: '10px 0 20px',
  fontSize: '.875rem',
  lineHeight: 1.5,
  color: 'var(--gray-200)',
  ul: {
    paddingLeft: '2rem',
    paddingTop: '1rem',
    maxHeight: '70vh',
  },
  overflowY: 'scroll'
});

const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  cursor: 'pointer',
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: 10,
  right: 10,
  color: 'var(--gray-200)',
});