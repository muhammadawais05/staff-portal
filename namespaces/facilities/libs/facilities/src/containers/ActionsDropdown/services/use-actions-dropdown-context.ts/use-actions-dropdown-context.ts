import { useContext } from 'react'

import { ActionsDropdownContext } from '../../containers/ActionsDropdownProvider/ActionsDropdownProvider'

export const useActionsDropdownContext = () =>
  useContext(ActionsDropdownContext)
