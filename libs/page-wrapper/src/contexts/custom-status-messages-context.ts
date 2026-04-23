import { AlertProps } from '@toptal/picasso'
import React, { ReactNode, useContext } from 'react'

export interface CustomStatusMessageOptions {
  id: string
  content: ReactNode
  autoHideDuration?: number
  variant?: AlertProps['variant']
  handleOnClose?: () => void
}

export interface CustomStatusMessagesContextProps {
  customStatusMessages: CustomStatusMessageOptions[]
  addStatusMessage: (config: CustomStatusMessageOptions) => void
  removeStatusMessage: (id: string) => void
}

export const CustomStatusMessagesContext =
  React.createContext<CustomStatusMessagesContextProps>({
    customStatusMessages: [],
    removeStatusMessage: () => {},
    addStatusMessage: () => {}
  })

export const useCustomStatusMessagesContext = () => {
  const context = useContext(CustomStatusMessagesContext)

  if (!context) {
    throw new Error(
      `useCustomStatusMessagesContext must be used within a CustomStatusMessagesProvider`
    )
  }

  return context
}
