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
    handleChangeUser: (newUser?: IUser) => void
})

const UserProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) => {
    const [user, setUser] = useState<IUser>()

    console.log("🚀 ~ file: index.tsx:15 ~ user:", user)
    const handleChangeUser = (newUser?: IUser) => {
      setUser(newUser)
    }


    return (
        <UserContext.Provider value={{
            user, handleChangeUser, 
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
