import { useEffect, useRef, useState } from 'react'

/**
 * Returns a number of child nodes of a HTML element, that fit a single line.
 *
 * @param reservedSpace number of pixel that can't be used to render a child node
 * @param itemWidthOffset number of pixels to add to width of each child node
 * @param expectedNumberOfItems number of child nodes that are expected in the container
 *
 * @example
 *   const { containerRef, visibleItemsLength } = useChildNodesFit({
 *     reservedSpace: 0,
 *     itemWidthOffset: 0,
 *     expectedNumberOfItems: 2
 *   })
 *
 *   return (
 *     <div ref={containerRef}>
 *      <span>Child 1</span>
 *      <span>Child 2</span>
 *     </div>
 *   )
 */
export const useChildNodesFit = ({
  reservedSpace,
  itemWidthOffset,
  expectedNumberOfItems
}: {
  reservedSpace: number
  itemWidthOffset: number
  expectedNumberOfItems: number
}) => {
  const [visibleItemsLength, setVisibleItemsLength] = useState<number>(
    expectedNumberOfItems
  )
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (containerRef.current) {
      const reservedSpacePlusOffset = reservedSpace + itemWidthOffset
      let takenSpace = 0
      let items = 0

      for (
        let index = 0;
        index < containerRef.current.childNodes[0].childNodes.length;
        index++
      ) {
        const div = containerRef.current.childNodes[0].childNodes[
          index
        ] as HTMLDivElement
        const availableSpace =
          containerRef.current.offsetWidth -
          itemWidthOffset -
          reservedSpacePlusOffset -
          takenSpace

        const labelSpace = div.offsetWidth + itemWidthOffset

        if (labelSpace < availableSpace) {
          takenSpace += labelSpace
          items += 1
        } else {
          break
        }
      }

      setVisibleItemsLength(items)
    }
  }, [
    setVisibleItemsLength,
    itemWidthOffset,
    expectedNumberOfItems,
    reservedSpace
  ])

  return { containerRef, visibleItemsLength }
}
