import { ComponentType, MemoExoticComponent } from 'react'

const assertErrorBoundaryErrorsCalled = <T>(
  consoleErrorSpy: jest.SpyInstance,
  errorMessage: string,
  Component: ComponentType<T> | MemoExoticComponent<ComponentType<T>>
) => {
  expect(consoleErrorSpy).toHaveBeenCalledTimes(2)
  expect(consoleErrorSpy.mock.calls).toEqual([
    [expect.stringContaining(errorMessage), expect.any(Error)],
    [
      expect.stringContaining(
        Component.displayName ||
          Component.name ||
          (Component as MemoExoticComponent<ComponentType<T>>)?.type.name
      )
    ]
  ])
}

export default assertErrorBoundaryErrorsCalled
