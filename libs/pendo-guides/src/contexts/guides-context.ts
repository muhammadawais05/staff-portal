import { createContext, useContext } from 'react'

interface GuidesAction {
  initialize: (options: pendo.InitOptions) => void
}

export const GuidesActionContext = createContext<GuidesAction>({
  initialize: () => {
    throw new Error('Pendo not initialized, please call function')
  }
})

const useGuidesAction = () => {
  return useContext(GuidesActionContext)
}

export default useGuidesAction
