import { fireEvent, render, screen, within } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { LazyLink, RenderProps } from '@staff-portal/facilities'
import { useQuery } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import EngagementPitchLink, { Props } from './EngagementPitchLink'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

const useQueryMock = useQuery as jest.Mock

jest.mock('@staff-portal/facilities', () => ({
  ...jest.requireActual('@staff-portal/facilities'),
  LazyLink: jest.fn()
}))

const mockLazyLink = (props?: Partial<RenderProps>) => {
  const LazyLinkMock = LazyLink as jest.Mock

  LazyLinkMock.mockImplementation(
    ({ children }: { children: (renderProps: RenderProps) => ReactNode }) =>
      children({
        disabled: false,
        loading: false,
        checkLink: jest.fn(),
        ...props
      })
  )
}

const renderComponent = (props: Partial<Props> = {}) => {
  useQueryMock.mockReturnValue({
    data: {
      operations: {
        submitNewEngagementWizard: {
          callable: OperationCallableTypes.ENABLED,
          messages: ['']
        }
      }
    }
  })

  return render(
    <TestWrapper>
      <EngagementPitchLink engagementId='1' {...props} />
    </TestWrapper>
  )
}

describe('EngagementPitchLink', () => {
  describe('when passing disabled', () => {
    it('disables the button', () => {
      mockLazyLink({ disabled: true })

      renderComponent()

      expect(screen.getByTestId('EngagementPitchLink')).toHaveAttribute(
        'disabled'
      )
    })
  })

  describe('when passing check link', () => {
    it('triggers the check link function', () => {
      const checkLink = jest.fn()

      mockLazyLink({ checkLink })

      renderComponent()

      fireEvent.click(screen.getByTestId('EngagementPitchLink'))

      expect(checkLink).toHaveBeenCalled()
    })
  })

  describe('when passing the loading', () => {
    it('shows the loading icon', () => {
      mockLazyLink({ loading: true })

      renderComponent()

      expect(
        within(screen.getByTestId('EngagementPitchLink')).getByRole(
          'progressbar'
        )
      ).toBeInTheDocument()
    })
  })
})
