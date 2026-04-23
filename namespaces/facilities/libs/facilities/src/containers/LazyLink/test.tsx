import { useNavigate, windowOpen } from '@staff-portal/navigation'
import { Button } from '@toptal/picasso'
import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { UrlWithMessages } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetLazyLink } from './data'
import LazyLink, { Props } from './LazyLink'
import { GetLazyLinkQuery } from './types'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useNavigate: jest.fn(),
  windowOpen: jest.fn()
}))

const useNavigateMock = useNavigate as jest.Mock
const navigateMock = jest.fn()
const windowOpenMock = jest.fn()

jest.mock('./data')
const mockUseGetLazyLink = useGetLazyLink as jest.Mock
const mockWindowOpen = windowOpen as jest.Mock

const mockSuccessImplementation = (link?: Partial<UrlWithMessages>) => {
  mockUseGetLazyLink.mockImplementation(
    (_, { onCompleted }: { onCompleted: (data: GetLazyLinkQuery) => void }) => [
      () =>
        onCompleted({
          node: {
            viewIntroDraftV2: {
              enabled: true,
              messages: [],
              url: 'https://toptal.com',
              ...link
            }
          }
        }),
      {
        data: {
          node: {
            id: encodeEntityId('1', 'Engagement'),
            viewIntroDraftV2: {
              enabled: true,
              messages: [],
              url: 'https://toptal.com',
              ...link
            }
          }
        },
        loading: false
      }
    ]
  )
}

const mockErrorImplementation = (message?: string) => {
  mockUseGetLazyLink.mockImplementation(
    (_, { onError }: { onError: (error: { message?: string }) => void }) => [
      () => onError({ message }),
      { loading: false }
    ]
  )
}

const arrangeTest = (props?: Partial<Props>) =>
  render(
    <TestWrapper>
      <LazyLink
        initialLink={{ enabled: true, messages: [], url: 'https://toptal.com' }}
        getLazyLinkVariables={{
          nodeId: encodeEntityId('1', 'Engagement'),
          nodeType: NodeType.ENGAGEMENT,
          propertyName: 'viewIntroDraftV2'
        }}
        {...props}
      >
        {({ checkLink, disabled }) => (
          <Button
            disabled={disabled}
            size='small'
            variant='secondary'
            onClick={checkLink}
            data-testid='LazyLink-button'
          >
            Test Button
          </Button>
        )}
      </LazyLink>
    </TestWrapper>
  )

describe('LazyLink', () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock)
  })

  describe('when there is an error', () => {
    it('shows default notification error', async () => {
      mockErrorImplementation()

      arrangeTest()

      fireEvent.click(screen.getByTestId('LazyLink-button'))

      expect(
        await screen.findByText('This link cannot be used at this moment.')
      ).toBeInTheDocument()
    })

    it('shows the custom error', async () => {
      mockErrorImplementation('Some error message')

      arrangeTest()

      fireEvent.click(screen.getByTestId('LazyLink-button'))

      expect(await screen.findByText('Some error message')).toBeInTheDocument()
    })
  })

  describe('when url is missing', () => {
    it('disables the button', async () => {
      mockSuccessImplementation({ url: undefined })

      arrangeTest()

      fireEvent.click(screen.getByTestId('LazyLink-button'))

      await waitFor(() => {
        expect(screen.getByTestId('LazyLink-button')).toHaveAttribute(
          'disabled'
        )
      })
    })
  })

  it('navigate to another page', async () => {
    mockSuccessImplementation()

    arrangeTest()

    fireEvent.click(screen.getByTestId('LazyLink-button'))

    await waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith('https://toptal.com')
    )
  })

  describe('navigate to a new browser tab', () => {
    it('calls windowOpen with a target parameter', async () => {
      mockSuccessImplementation()
      mockWindowOpen.mockImplementation(windowOpenMock)

      arrangeTest({ target: '_blank' })

      fireEvent.click(screen.getByTestId('LazyLink-button'))

      await waitFor(() => {
        expect(windowOpenMock).toHaveBeenCalledTimes(1)
        expect(windowOpenMock).toHaveBeenCalledWith(
          'https://toptal.com',
          '_blank'
        )
      })
    })
  })
})
