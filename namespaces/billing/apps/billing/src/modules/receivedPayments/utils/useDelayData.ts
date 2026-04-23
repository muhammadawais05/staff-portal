import { useEffect, useState } from 'react'

// @TODO: remove once actual data is in place
const useDelayData = <T>(resolveTo: T, timeout = 1500) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      setData(resolveTo)
    }, timeout)

    return () => clearTimeout(timer)
  }, [resolveTo, timeout])

  return { data, loading }
}

export default useDelayData
