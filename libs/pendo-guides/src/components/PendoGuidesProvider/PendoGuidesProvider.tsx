import React, { useState, useCallback, ReactNode, useEffect } from 'react'

import { safelyStartGuides } from '../../utils'
import { GuidesActionContext } from '../../contexts/guides-context'
import PendoGuidesVisitor from '../PendoGuidesVisitor'

const PendoGuidesProvider = ({ children }: { children?: ReactNode }) => {
  const [initOptions, setInitOptions] = useState<null | pendo.InitOptions>()

  const initialize = useCallback((options: pendo.InitOptions) => {
    setInitOptions(options)
  }, [])

  useEffect(() => {
    if (initOptions) {
      window.pendo?.initialize({
        ...initOptions,
        events: {
          ready: () => {
            safelyStartGuides()
          }
        }
      })
    }
  }, [initOptions])

  return (
    <GuidesActionContext.Provider value={{ initialize }}>
      <PendoGuidesVisitor />
      {children}
    </GuidesActionContext.Provider>
  )
}

export default PendoGuidesProvider
