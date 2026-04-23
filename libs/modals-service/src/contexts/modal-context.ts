import { createContext } from 'react'

import { ModalRegistry } from '../types'

const throwWrongContext = () => {
  throw new Error('Modals cannot be used outside ModalProvider')
}

export const ModalContext = createContext<{ registry: ModalRegistry }>({
  registry: {
    delete: throwWrongContext,
    set: throwWrongContext,
    get: throwWrongContext,
    keys: throwWrongContext
  }
})
