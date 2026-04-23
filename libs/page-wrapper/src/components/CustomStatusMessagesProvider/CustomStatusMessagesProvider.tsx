import React, { useCallback, useRef, useState, ReactNode } from 'react'

import {
  CustomStatusMessageOptions,
  CustomStatusMessagesContext
} from '../../contexts'

const CustomStatusMessagesProvider = ({
  children
}: {
  children: ReactNode
}) => {
  const [customStatusMessages, setCustomStatusMessages] = useState<
    CustomStatusMessageOptions[]
  >([])

  const timerRef = useRef<{
    [messageId: string]: NodeJS.Timeout
  }>({})

  const addTimer = (messageId: string, timerId: NodeJS.Timeout) => {
    timerRef.current[messageId] = timerId
  }

  const removeTimer = useCallback((messageId: string) => {
    clearTimeout(timerRef.current[messageId])
    delete timerRef.current[messageId]
  }, [])

  const removeStatusMessage = useCallback(
    (messageId: string) => {
      setCustomStatusMessages(prevState =>
        prevState.filter(({ id }) => id !== messageId)
      )
      if (timerRef.current[messageId]) {
        removeTimer(messageId)
      }
    },
    [setCustomStatusMessages, removeTimer]
  )

  const handleAutoHide = useCallback(
    (settings: CustomStatusMessageOptions) => {
      const timerId = setTimeout(() => {
        removeStatusMessage(settings.id)
      }, settings.autoHideDuration)

      addTimer(settings.id, timerId)
    },
    [removeStatusMessage]
  )

  const addStatusMessage = useCallback(
    (config: CustomStatusMessageOptions) => {
      setCustomStatusMessages(prevState => [...prevState, config])
      if (config.autoHideDuration) {
        handleAutoHide(config)
      }
    },
    [handleAutoHide]
  )

  return (
    <CustomStatusMessagesContext.Provider
      value={{
        addStatusMessage,
        removeStatusMessage,
        customStatusMessages
      }}
    >
      {children}
    </CustomStatusMessagesContext.Provider>
  )
}

export default CustomStatusMessagesProvider
