import { ReactNode, ReactElement, cloneElement } from 'react'

export const nest = (children: ReactNode, component: ReactElement) =>
  cloneElement(component, {}, children)
