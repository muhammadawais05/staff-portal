import { useEffect, useState } from 'react'

let unsupported: boolean

type EffectiveConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | ''

const useNetworkStatus = (
  initialEffectiveConnectionType: EffectiveConnectionType = ''
) => {
  unsupported = !(
    typeof navigator !== 'undefined' &&
    'connection' in navigator &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'effectiveType' in navigator.connection
  )

  const initialNetworkStatus = {
    unsupported,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    effectiveConnectionType: unsupported ? initialEffectiveConnectionType : navigator.connection.effectiveType // prettier-ignore
  }

  const [networkStatus, setNetworkStatus] = useState(initialNetworkStatus)

  useEffect(() => {
    if (!unsupported) {
      const navigatorConnection = navigator?.connection
      const updateECTStatus = () => {
        setNetworkStatus({
          ...initialNetworkStatus,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          effectiveConnectionType: navigatorConnection?.effectiveType ?? ''
        })
      }

      navigatorConnection?.addEventListener('change', updateECTStatus)

      return () => {
        navigatorConnection?.removeEventListener('change', updateECTStatus)
      }
    }
  }, []) // eslint-disable-line

  return {
    ...networkStatus,
    setNetworkStatus
  }
}

export { useNetworkStatus }
