import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode
} from 'react'

import {
  confirmationActions,
  confirmationInitialState
} from './confirmationActions'
import { modalActions, modalInitialState } from './modalActions'

// combine initial states
export const initialState = {
  ...confirmationInitialState,
  ...modalInitialState
}

type State = typeof initialState

type StoreContextData = {
  dispatch: Dispatch<unknown>
  state: State
}
const StoreContext = createContext({} as StoreContextData)

// combine actions
const Actions: { [key: string]: (state: State, action?: any) => any } = {
  ...modalActions,
  ...confirmationActions
}

// Exported only for testing
export const reducer = (state: State, action: any) => {
  const act = Actions[action.type]
  const update = act(state, action)

  return { ...state, ...update }
}

// eslint-disable-next-line react/function-component-definition
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StoreContext.Provider value={{ dispatch, state }}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const { dispatch, state } = useContext(StoreContext)

  return { dispatch, state }
}
