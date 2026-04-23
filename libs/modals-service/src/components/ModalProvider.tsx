import React, { ReactNode } from 'react'

import { ModalRegistry } from '../types'
import { ModalsList } from './ModalsList'
import { ModalOpener } from './ModalOpener'
import { ModalContext } from '../contexts/modal-context'

interface Props {
  registry: ModalRegistry
  children?: ReactNode
}

export const ModalProvider = ({ registry, children }: Props) => {
  return <>
    <ModalContext.Provider value={{ registry }}>
      {children}
      <ModalsList registry={registry} />
    </ModalContext.Provider>
    <ModalOpener registry={registry} />
  </>
}
