import styles from './DialogChanges.module.css';
import { DialogSimple } from '../DialogSimple';
import Changelog from '../../../CHANGELOG.json'

interface DialogChangesResume {
  onClose: () => void
  open: boolean
}

export const DialogChanges = ({ open, onClose }: DialogChangesResume) => {
  if(!open){
    return null
  }

  return (
    <DialogSimple open onClose={onClose} title={`Histórico de versões`}>
      <ul className={ styles.ul }>
        {
          Changelog.map((version) => (
            <>
              <li className={ styles.li } key={version.version}>
                <div className={ styles.radio_done }>
                  <svg viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.43107 0.342093L4.09914 4.67403L1.61667 2.19156L0.780762 3.02747L4.09914 6.34584L9.26698 1.178L8.43107 0.342093Z" fill="#F2F2F2"/>
                  </svg>  
                </div>
                <b>{version.version}</b>
              </li>
              {
                version.adds.map((added) => (
                  <li className={ styles.liResolve } key={added}>
                      <div className={ styles.radio_undone } />
                      (Adicionado) - {added}
                  </li>
                ))
              }
              {
                version.changes.map((changed) => (
                  <li className={ styles.liResolve } key={changed}>
                      <div className={ styles.radio_undone } />
                      (Alterado) - {changed}
                  </li>
                ))
              }
            </>
          ))
        }
      </ul>
    </DialogSimple>
  )
}