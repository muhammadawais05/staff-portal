import { useRef, useState, useEffect, useLayoutEffect } from 'react'

/**
 * This is a copy and paste from Picasso.
 * TODO: Export this hook from Picasso as a util and use that instead
 */
const useEllipsis = () => {
  const ref = useRef<HTMLDivElement>()
  const [isEllipsis, setIsEllipsis] = useState(false)

  const measure = () => {
    if (!ref || !ref.current) {
      return
    }
    setIsEllipsis(ref.current.scrollWidth > ref.current.clientWidth)
  }

  useLayoutEffect(measure)

  useEffect(() => {
    window.addEventListener('resize', measure)

    return () => {
      window.removeEventListener('resize', measure)
    }
  }, [])

  return { ref, isEllipsis }
}

export default useEllipsis
