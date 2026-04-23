import React, { ComponentProps } from 'react'
import { render as renderComponent, screen } from '@testing-library/react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { Button } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import LikelihoodToClose from './LikelihoodToClose'
import { useUpdateLikelihoodToCloseModal } from './hooks'

jest.mock('./hooks')

const ButtonMock = Button.Circular as jest.Mock

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: {
    Circular: jest.fn()
  }
}))

jest.mock('@staff-portal/ui', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@staff-portal/clients', () => ({
  NO_VALUE: '—'
}))

const arrangeTest = (props: ComponentProps<typeof LikelihoodToClose>) =>
  renderComponent(
    <TestWrapper>
      <LikelihoodToClose {...props} />
    </TestWrapper>
  )

const mockUseUpdateLikelihoodToCloseModal =
  useUpdateLikelihoodToCloseModal as jest.Mock

describe('LikelihoodToClose', () => {
  beforeEach(() => {
    ButtonMock.mockImplementation(({ children }) => <>{children}</>)
    mockUseUpdateLikelihoodToCloseModal.mockReturnValueOnce({
      showModal: () => null,
      loading: false
    })
  })

  describe('when different values passed', () => {
    it.each([
      [{ value: undefined, displayedValue: NO_VALUE }],
      [{ value: null, displayedValue: NO_VALUE }],
      [{ value: 0, displayedValue: '0%' }],
      [{ value: 100, displayedValue: '100%' }]
    ])('renders as expected %s', ({ value, displayedValue }) => {
      arrangeTest({
        clientId: 'id',
        value,
        operation: {
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }
      })

      expect(screen.getByTestId('LikelihoodToClose-viewer')).toHaveTextContent(
        displayedValue
      )
    })
  })

  describe('when operation is disabled', () => {
    it('edit button is disabled', () => {
      const operation = {
        callable: OperationCallableTypes.DISABLED,
        messages: []
      }
      const clientId = 'id'

      arrangeTest({
        clientId,
        value: 20,
        operation
      })

      expect(ButtonMock).toHaveBeenCalledTimes(1)
      expect(ButtonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          disabled: true
        }),
        {}
      )
    })
  })
})
