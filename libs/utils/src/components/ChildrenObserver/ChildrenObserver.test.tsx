import React, {
  MutableRefObject,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { act, render, screen } from '@toptal/picasso/test-utils'
import { Container } from '@toptal/picasso'

import ChildrenObserver, { Props } from './ChildrenObserver'

const ComponentWithEmptyResult = () => null
const ComponentWithResult = () => <div data-testid='result' />

const LazySuspender = ({
  children,
  timeoutRef,
  resolved,
  setResolved
}: {
  children: ReactElement
  timeoutRef: MutableRefObject<number | undefined>
  resolved: boolean
  setResolved: (resolved: boolean) => void
}) => {
  const promise = useMemo(
    () =>
      new Promise<void>(resolve => {
        timeoutRef.current = window.setTimeout(() => {
          setResolved(true)
          resolve()
        }, 100)
      }),
    [timeoutRef, setResolved]
  )

  if (!resolved) {
    throw promise
  }

  return children
}

const LazySuspenderWrapper = ({ children }: { children: ReactElement }) => {
  const [resolved, setResolved] = useState(false)
  const timeoutRef = useRef<number>()

  useEffect(() => {
    return () => {
      window.clearTimeout(timeoutRef.current)
    }
  }, [timeoutRef])

  return (
    <LazySuspender
      timeoutRef={timeoutRef}
      resolved={resolved}
      setResolved={setResolved}
    >
      {children}
    </LazySuspender>
  )
}

const arrangeTest = (
  props: Omit<Props, 'children' | 'waitFallback'> & {
    observableChildren: ReactElement
  }
) => {
  return render(
    <ChildrenObserver<HTMLDivElement>
      waitFallback={<div data-testid='loader' />}
      {...props}
    >
      {({ observableChildrenContainerRef, hasChildren }) =>
        hasChildren ? (
          <Container>
            <Container
              ref={observableChildrenContainerRef}
              data-testid='container'
            >
              {props.observableChildren}
            </Container>
          </Container>
        ) : (
          <div data-testid='error-view' />
        )
      }
    </ChildrenObserver>
  )
}

describe('ChildrenObserver', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  describe('when `supportLazyLoading` is `false`', () => {
    describe('when container has children returning result', () => {
      it('renders children', () => {
        const { unmount } = arrangeTest({
          supportLazyLoading: false,
          observableChildren: <ComponentWithResult />
        })

        expect(screen.getByTestId('result')).toBeInTheDocument()
        expect(screen.getByTestId('container')).toBeInTheDocument()
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
        expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()

        unmount()
      })
    })

    describe('when container has children returning null', () => {
      it('renders children', () => {
        const { unmount } = arrangeTest({
          supportLazyLoading: false,
          observableChildren: <ComponentWithEmptyResult />
        })

        expect(screen.queryByTestId('result')).not.toBeInTheDocument()
        expect(screen.queryByTestId('container')).not.toBeInTheDocument()
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
        expect(screen.getByTestId('error-view')).toBeInTheDocument()

        unmount()
      })
    })
  })

  describe('when `supportLazyLoading` is `true` and children are non-lazily loaded', () => {
    describe('when container has children returning result', () => {
      it('renders children', () => {
        const { unmount } = arrangeTest({
          supportLazyLoading: true,
          observableChildren: <ComponentWithResult />
        })

        expect(screen.getByTestId('result')).toBeInTheDocument()
        expect(screen.getByTestId('container')).toBeInTheDocument()
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
        expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()

        unmount()
      })
    })

    describe('when container has children returning null', () => {
      it('renders children', () => {
        const { unmount } = arrangeTest({
          supportLazyLoading: true,
          observableChildren: <ComponentWithEmptyResult />
        })

        expect(screen.queryByTestId('result')).not.toBeInTheDocument()
        expect(screen.queryByTestId('container')).not.toBeInTheDocument()
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
        expect(screen.getByTestId('error-view')).toBeInTheDocument()

        unmount()
      })
    })
  })

  describe('when `supportLazyLoading` is `true` and children are lazily loaded', () => {
    describe('when children are in loading state', () => {
      describe('when container has children returning result', () => {
        it('renders children', () => {
          const { unmount } = arrangeTest({
            supportLazyLoading: true,
            observableChildren: (
              <LazySuspenderWrapper>
                <ComponentWithResult />
              </LazySuspenderWrapper>
            )
          })

          expect(screen.queryByTestId('result')).not.toBeInTheDocument()
          expect(screen.getByTestId('container')).toBeInTheDocument()
          expect(screen.getByTestId('loader')).toBeInTheDocument()
          expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()

          unmount()
        })
      })

      describe('when container has children returning null', () => {
        it('renders children', () => {
          const { unmount } = arrangeTest({
            supportLazyLoading: true,
            observableChildren: (
              <LazySuspenderWrapper>
                <ComponentWithEmptyResult />
              </LazySuspenderWrapper>
            )
          })

          expect(screen.queryByTestId('result')).not.toBeInTheDocument()
          expect(screen.getByTestId('container')).toBeInTheDocument()
          expect(screen.getByTestId('loader')).toBeInTheDocument()
          expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()

          unmount()
        })
      })
    })

    describe('when children was loaded', () => {
      describe('when container has children returning result', () => {
        it('renders children', () => {
          const { unmount } = arrangeTest({
            supportLazyLoading: true,
            observableChildren: (
              <LazySuspenderWrapper>
                <ComponentWithResult />
              </LazySuspenderWrapper>
            )
          })

          act(() => {
            jest.advanceTimersByTime(200)
          })

          expect(screen.getByTestId('result')).toBeInTheDocument()
          expect(screen.getByTestId('container')).toBeInTheDocument()
          expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
          expect(screen.queryByTestId('error-view')).not.toBeInTheDocument()

          unmount()
        })
      })

      describe('when container has children returning null', () => {
        it('renders children', () => {
          const { unmount } = arrangeTest({
            supportLazyLoading: true,
            observableChildren: (
              <LazySuspenderWrapper>
                <ComponentWithEmptyResult />
              </LazySuspenderWrapper>
            )
          })

          act(() => {
            jest.advanceTimersByTime(200)
          })

          expect(screen.queryByTestId('result')).not.toBeInTheDocument()
          expect(screen.queryByTestId('container')).not.toBeInTheDocument()
          expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
          expect(screen.getByTestId('error-view')).toBeInTheDocument()

          unmount()
        })
      })
    })
  })
})
