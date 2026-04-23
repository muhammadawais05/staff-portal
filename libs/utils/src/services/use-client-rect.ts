import { useState, useCallback } from 'react'

// Please see the https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
export type BoundingRect = {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}

const useClientRect = () => {
  const [rect, setRect] = useState<BoundingRect | null>(null)
  const callbackRef = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect())
    }
  }, [])

  return { rect, callbackRef }
}

export default useClientRect
