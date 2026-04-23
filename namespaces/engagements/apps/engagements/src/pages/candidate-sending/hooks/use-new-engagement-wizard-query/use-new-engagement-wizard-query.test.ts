import { renderHook } from '@testing-library/react-hooks'
import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'
import { TypedDocumentNode, useQuery } from '@staff-portal/data-layer-service'

import useNewEngagementWizardQuery from './use-new-engagement-wizard-query'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

const mockUseQuery = useQuery as jest.Mock

const data = { foo: 'foo' }

const arrangeTest = () => {
  mockUseQuery.mockImplementation(
    (document, { onCompleted }: { onCompleted?: (data: unknown) => void }) => {
      onCompleted?.(data)

      return {
        refetch: () => {
          onCompleted?.(data)
        }
      }
    }
  )
}

describe('useNewEngagementWizardQuery', () => {
  const document = {} as TypedDocumentNode<
    Record<string, unknown>,
    { attributes: NewEngagementWizardAttributes }
  >

  const initialAttributes = {
    jobId: '123'
  }
  const updatedAttributes = {
    talentId: '456'
  }

  beforeEach(() => {
    arrangeTest()
  })

  describe('when initial fetch', () => {
    it('calls `onComplete` callback with `isRefetching: false` flag', () => {
      const onCompletedMock = jest.fn()

      renderHook<NewEngagementWizardAttributes, unknown>(
        attributes =>
          useNewEngagementWizardQuery(document, {
            variables: {
              attributes
            },
            refetchOnAttributesChange: true,
            onCompleted: onCompletedMock
          }),
        {
          initialProps: initialAttributes
        }
      )

      expect(onCompletedMock).toHaveBeenCalledWith(data, false)
    })
  })

  describe('when manual re-fetch', () => {
    it('calls `onComplete` callback with `isRefetching: true` flag', () => {
      const onCompletedMock = jest.fn()

      const { result } = renderHook<
        NewEngagementWizardAttributes,
        { refetch: () => void }
      >(
        attributes =>
          useNewEngagementWizardQuery(document, {
            variables: {
              attributes
            },
            refetchOnAttributesChange: true,
            onCompleted: onCompletedMock
          }),
        {
          initialProps: initialAttributes
        }
      )

      expect(onCompletedMock).toHaveBeenNthCalledWith(1, data, false)

      result.current?.refetch()

      expect(onCompletedMock).toHaveBeenNthCalledWith(2, data, true)
    })
  })

  describe('when manual re-fetch and then re-fetch on variables change', () => {
    it('calls `onComplete` callback with a valid `isRefetching` flag value', () => {
      const onCompletedMock = jest.fn()

      const { result, rerender } = renderHook<
        NewEngagementWizardAttributes,
        { refetch: () => void }
      >(
        attributes =>
          useNewEngagementWizardQuery(document, {
            variables: {
              attributes
            },
            refetchOnAttributesChange: true,
            onCompleted: onCompletedMock
          }),
        {
          initialProps: initialAttributes
        }
      )

      expect(onCompletedMock).toHaveBeenNthCalledWith(1, data, false)

      result.current?.refetch()

      expect(onCompletedMock).toHaveBeenNthCalledWith(2, data, true)

      rerender(updatedAttributes)

      expect(onCompletedMock).toHaveBeenNthCalledWith(3, data, false)
    })
  })

  describe('when `refetchOnVariablesChange` option is `true`', () => {
    it('calls query with actual attributes', () => {
      const onCompletedMock = jest.fn()

      const { rerender } = renderHook<NewEngagementWizardAttributes, unknown>(
        attributes =>
          useNewEngagementWizardQuery(document, {
            variables: {
              attributes
            },
            refetchOnAttributesChange: true,
            onCompleted: onCompletedMock
          }),
        {
          initialProps: initialAttributes
        }
      )

      expect(mockUseQuery).toHaveBeenNthCalledWith(1, document, {
        variables: {
          attributes: initialAttributes
        },
        notifyOnNetworkStatusChange: true,
        throwOnError: false,
        onCompleted: expect.any(Function),
        skip: undefined
      })

      rerender(updatedAttributes)

      expect(mockUseQuery).toHaveBeenNthCalledWith(2, document, {
        variables: {
          attributes: updatedAttributes
        },
        notifyOnNetworkStatusChange: true,
        throwOnError: false,
        onCompleted: expect.any(Function),
        skip: undefined
      })
    })
  })

  describe('when `refetchOnVariablesChange` option is `false`', () => {
    it('calls query with memoized initial attributes', () => {
      const onCompletedMock = jest.fn()

      const { rerender } = renderHook<NewEngagementWizardAttributes, unknown>(
        attributes =>
          useNewEngagementWizardQuery(document, {
            variables: {
              attributes
            },
            refetchOnAttributesChange: false,
            onCompleted: onCompletedMock
          }),
        {
          initialProps: initialAttributes
        }
      )

      expect(mockUseQuery).toHaveBeenNthCalledWith(1, document, {
        variables: {
          attributes: initialAttributes
        },
        notifyOnNetworkStatusChange: true,
        throwOnError: false,
        onCompleted: expect.any(Function),
        skip: undefined
      })

      rerender(updatedAttributes)

      expect(mockUseQuery).toHaveBeenNthCalledWith(2, document, {
        variables: {
          attributes: initialAttributes
        },
        throwOnError: false,
        notifyOnNetworkStatusChange: true,
        onCompleted: expect.any(Function),
        skip: undefined
      })
    })
  })

  describe('when `refetchOnVariablesChange` option is `false` and `skip` value changed', () => {
    it('calls query with memoized initial attributes and resets memoized attributes on `skip` value change', () => {
      const { rerender } = renderHook<
        { attributes: NewEngagementWizardAttributes; skip: boolean },
        unknown
      >(
        props =>
          useNewEngagementWizardQuery(document, {
            variables: {
              attributes: props.attributes
            },
            skip: props.skip,
            refetchOnAttributesChange: false
          }),
        {
          initialProps: {
            attributes: initialAttributes,
            skip: true
          }
        }
      )

      expect(mockUseQuery).toHaveBeenNthCalledWith(1, document, {
        variables: {
          attributes: initialAttributes
        },
        notifyOnNetworkStatusChange: false,
        throwOnError: false,
        onCompleted: undefined,
        skip: true
      })

      rerender({
        attributes: updatedAttributes,
        skip: true
      })

      expect(mockUseQuery).toHaveBeenNthCalledWith(2, document, {
        variables: {
          attributes: initialAttributes
        },
        notifyOnNetworkStatusChange: false,
        throwOnError: false,
        onCompleted: undefined,
        skip: true
      })

      rerender({
        attributes: {
          ...initialAttributes,
          ...updatedAttributes
        },
        skip: false
      })

      expect(mockUseQuery).toHaveBeenNthCalledWith(3, document, {
        variables: {
          attributes: {
            ...initialAttributes,
            ...updatedAttributes
          }
        },
        notifyOnNetworkStatusChange: false,
        throwOnError: false,
        onCompleted: undefined,
        skip: false
      })

      rerender({
        attributes: initialAttributes,
        skip: false
      })

      expect(mockUseQuery).toHaveBeenNthCalledWith(3, document, {
        variables: {
          attributes: {
            ...initialAttributes,
            ...updatedAttributes
          }
        },
        notifyOnNetworkStatusChange: false,
        throwOnError: false,
        onCompleted: undefined,
        skip: false
      })
    })
  })
})
