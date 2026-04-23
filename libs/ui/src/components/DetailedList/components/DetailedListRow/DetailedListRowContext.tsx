import { createContext, useContext } from 'react'

interface ContextValue {
  numberOfRowItems?: number
}

export const DetailedListRowContext = createContext<ContextValue | null>(null)
export const useDetailedListRowContext = () =>
  useContext(DetailedListRowContext)
