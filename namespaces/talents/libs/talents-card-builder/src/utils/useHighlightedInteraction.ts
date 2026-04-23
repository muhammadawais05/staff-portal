import { useCallback, useLayoutEffect, useState } from 'react'

export type InteractionVariant =
  | 'default'
  | 'default-hovered'
  | 'highlighted'
  | 'highlighted-hovered'

export const useHighlightInteraction = (highlighted: boolean) => {
  const [variant, setVariant] = useState<InteractionVariant>(
    highlighted ? 'highlighted' : 'highlighted-hovered'
  )

  const [hovered, setHovered] = useState(false)

  useLayoutEffect(() => {
    if (highlighted) {
      setVariant('highlighted')
    }
  }, [highlighted])

  useLayoutEffect(() => {
    if (!highlighted) {
      setVariant(hovered ? 'default-hovered' : 'default')
    }
  }, [highlighted, hovered])

  const onMouseEnter = useCallback(() => {
    setVariant(highlighted ? 'highlighted-hovered' : 'default-hovered')
    setHovered(true)
  }, [highlighted])

  const onMouseLeave = useCallback(() => {
    setVariant(highlighted ? 'highlighted' : 'default')
    setHovered(false)
  }, [highlighted])

  return {
    variant,
    onMouseEnter,
    onMouseLeave
  }
}
