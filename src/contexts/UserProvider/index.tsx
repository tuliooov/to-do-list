import { User } from 'firebase/auth'
import React, { createContext, useState } from 'react'

export interface IUser extends User {
  accessToken: string
  stsTokenManager: {
    refreshToken: string
  }
}

const UserContext = createContext({} as {
    user?: IUser
    handleChangeUser: (newUser: IUser) => void
    getAccessToken: () => string
})

export const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "@toDo:accessToken"
export const LOCAL_STORAGE_KEY_UID = "@toDo:uid"
export const LOCAL_STORAGE_KEY_REFRESH_TOKEN = "@toDo:refreshToken"

const UserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
    const [user, setUser] = useState<IUser>()

    console.log("🚀 ~ file: index.tsx:15 ~ user:", user)
    const handleChangeUser = (newUser: IUser) => {
      if(newUser){
        localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, newUser.accessToken)
        localStorage.setItem(LOCAL_STORAGE_KEY_UID, newUser.uid)
        localStorage.setItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN, newUser.stsTokenManager.refreshToken)
        setUser(newUser)
      }
    }

    const getAccessToken = () => {
      return localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN) || ''
    }

    return (
        <UserContext.Provider value={{
            user, handleChangeUser, getAccessToken
        }}>
            {children}
        </UserContext.Provider>
    )
}

const useUserContext = () => {
  const context = React.useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUserContext }
