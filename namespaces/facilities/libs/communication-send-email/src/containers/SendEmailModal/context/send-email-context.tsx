import React, {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode
} from 'react'

import { EmailContext } from '../types'

interface SendEmailContextValue {
  emailContext: EmailContext
  isBodyPreview: boolean
  setIsBodyPreview: Dispatch<SetStateAction<boolean>>
}

const SendEmailContext = createContext<SendEmailContextValue>(
  undefined as unknown as SendEmailContextValue
)

interface Props {
  emailContext: EmailContext
  children?: ReactNode
}

export const SendEmailProvider = ({ emailContext, children }: Props) => {
  const [isBodyPreview, setIsBodyPreview] = useState(false)

  return (
    <SendEmailContext.Provider
      value={{ emailContext, isBodyPreview, setIsBodyPreview }}
    >
      {children}
    </SendEmailContext.Provider>
  )
}

export const useSendEmailContext = () => {
  const value = useContext(SendEmailContext)

  if (value === undefined) {
    throw new Error(
      '`useSendEmailContext` must be used within a `SendEmailProvider`'
    )
  }

  return value
}
