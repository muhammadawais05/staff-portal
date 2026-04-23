import React, {
  ReactElement,
  Ref,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { StrictUnion } from '../../types'
import { ChildrenMountingState } from './enums'

export type Props<TElement extends HTMLElement = HTMLElement> = {
  children: (data: {
    observableChildrenContainerRef: Ref<TElement> | undefined
    hasChildren: boolean
  }) => ReactElement | null
} & StrictUnion<
  { supportLazyLoading?: boolean; waitFallback?: ReactElement } | {}
>

const SuspenseFallback = ({
  waitFallback,
  onPending,
  onResolved
}: {
  waitFallback: ReactElement
  onPending: () => void
  onResolved: () => void
}) => {
  useEffect(() => {
    onPending()

    return () => {
      setTimeout(onResolved, 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return waitFallback
}

/**
 * Component that watches for empty rendered children DOM nodes inside the target DOM node
 * Currently it does not support `watch` mode.
 *
 * TODO: implement `watch` mode
 */
const ChildrenObserver = <TElement extends HTMLElement = HTMLElement>({
  children,
  supportLazyLoading = false,
  waitFallback
}: Props<TElement>) => {
  const isMountedRef = useRef(true)
  const [hasChildren, setHasChildren] = useState<boolean | null>(null)
  const childrenMountingStateRef = useRef<ChildrenMountingState>(
    ChildrenMountingState.Initial
  )

  const observableChildrenContainerRef = useRef<TElement>(null)

  useEffect(() => {
    return () => {
      isMountedRef.current = false
    }
  }, [isMountedRef])

  useEffect(() => {
    if (hasChildren) {
      return
    }

    if (!observableChildrenContainerRef.current) {
      return
    }

    if (childrenMountingStateRef.current === ChildrenMountingState.Initial) {
      childrenMountingStateRef.current = ChildrenMountingState.Mounted

      setHasChildren(!!observableChildrenContainerRef.current?.children.length)
    }
  }, [hasChildren, childrenMountingStateRef, observableChildrenContainerRef])

  const handleSuspensePendingState = useCallback(() => {
    childrenMountingStateRef.current = ChildrenMountingState.Pending
  }, [childrenMountingStateRef])

  const handleSuspenseResolvedState = useCallback(() => {
    childrenMountingStateRef.current = ChildrenMountingState.Mounted

    if (isMountedRef.current) {
      setHasChildren(!!observableChildrenContainerRef.current?.children.length)
    }
  }, [childrenMountingStateRef, observableChildrenContainerRef])

  const childrenElement = children({
    observableChildrenContainerRef,
    hasChildren: hasChildren !== false
  })

  if (!supportLazyLoading || !waitFallback) {
    return childrenElement
  }

  return (
    <Suspense
      fallback={
        <SuspenseFallback
          onPending={handleSuspensePendingState}
          onResolved={handleSuspenseResolvedState}
          waitFallback={waitFallback}
        />
      }
    >
      {childrenElement}
    </Suspense>
  )
}

export default ChildrenObserver
