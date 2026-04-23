import React, { createContext, ReactNode } from 'react'

interface ProviderProps {
  children: ReactNode
  onStart?: () => void
  onSettled?: () => void
}

type ContextProps = {
  onStart?: () => void
  onSettled?: () => void
}

export const ActionsDropdownContext = createContext<ContextProps>({})

export const ActionsDropdownProvider = ({
  children,
  onStart,
  onSettled
}: ProviderProps) => {
  return (
    <ActionsDropdownContext.Provider
      value={{
        onStart,
        onSettled
      }}
    >
      {children}
    </ActionsDropdownContext.Provider>
  )
}
