import { MutableRefObject, useLayoutEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const useResizeCounter = (
  element: MutableRefObject<HTMLElement | null>,
  { delay = 200 } = {}
) => {
  const [count, setCount] = useState(0)
  const isMounted = useRef(true)

  useLayoutEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  const triggerRender = useDebouncedCallback(() => {
    if (!isMounted.current) {
      return
    }
    setCount(oldCount => oldCount + 1)
  }, delay)

  useLayoutEffect(() => {
    // We are not polyfilling ResizeObserver so if it is available, we use it
    if (window.ResizeObserver) {
      return
    }

    // If it's not, we fallback to event-based size detection
    window.addEventListener('resize', triggerRender)

    return () => {
      window.removeEventListener('resize', triggerRender)
    }
  }, [element, triggerRender])

  // We're using ResizeObserver if available. It is better since it does not rely
  // on the whole page dimensions change, but rather the specific element it is
  // listening!
  useLayoutEffect(() => {
    if (!window.ResizeObserver || !element.current) {
      return
    }

    const observer = new window.ResizeObserver(triggerRender)

    observer.observe(element.current)

    return () => {
      observer.disconnect()
    }
  }, [element, triggerRender])

  return count
}
