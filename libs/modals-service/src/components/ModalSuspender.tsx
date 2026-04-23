import { useEffect, useRef, useMemo } from 'react'

const Suspender = () => {
  const resolveRef = useRef<() => void>()
  const promise = useMemo(
    () =>
      new Promise<void>(resolve => {
        resolveRef.current = resolve
      }),
    []
  )

  useEffect(() => {
    return () => {
      resolveRef.current?.()
    }
  })

  throw promise
}

export default Suspender
