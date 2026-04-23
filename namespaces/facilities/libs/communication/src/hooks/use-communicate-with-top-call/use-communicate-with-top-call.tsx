import { useEffect } from 'react'

const EXTERNAL_DATA_SEND_EVENT = 'EXTERNAL_DATA_SEND'
const TOPCALL_INIT_EVENT = 'TOPCALL_INIT'

const dispatchEvent = (data: unknown) =>
  document.dispatchEvent(
    new CustomEvent(EXTERNAL_DATA_SEND_EVENT, { detail: data })
  )

export const useCommunicateWithTopCall = <T,>(
  data: T,
  emptyData: T
) =>
  useEffect(() => {
    const listener = () => dispatchEvent(data)

    // Listen to top-call init and send freshest data to it.
    dispatchEvent(data)
    document.addEventListener(TOPCALL_INIT_EVENT, listener)

    return () => {
      document.removeEventListener(TOPCALL_INIT_EVENT, listener)
      // Clear data from the top-call when leaving the page associated with the widget
      dispatchEvent(emptyData)
    }
  }, [data, emptyData])
