import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { Operation } from '@staff-portal/operations'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { Button } from '@toptal/picasso'
import { useActionLoading } from '@staff-portal/utils'

import CreateClaimerButton from './CreateClaimerButton'
import { useCreateClaimerModal } from './services'

jest.mock('./services', () => ({
  useCreateClaimerModal: jest.fn()
}))
jest.mock('@staff-portal/utils', () => ({
  useActionLoading: jest.fn()
}))
jest.mock('@staff-portal/operations', () => ({
  ...jest.requireActual('@staff-portal/operations'),
  Operation: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof CreateClaimerButton>) =>
  render(<CreateClaimerButton {...props} />)

const mockedUseCreateClaimerModal = useCreateClaimerModal as jest.Mock
const mockedUseActionLoading = useActionLoading as jest.Mock
const mockedOperation = Operation as jest.Mock
const mockedButton = Button as unknown as jest.Mock

describe('CreateClaimerButton', () => {
  const showModal = () => null
  const actionsLoading = {}

  beforeEach(() => {
    mockedButton.mockReturnValueOnce(null)
    mockedUseCreateClaimerModal.mockReturnValueOnce({ showModal })
    mockedUseActionLoading.mockReturnValueOnce({ actionsLoading })
  })

  describe('when you pass expected props', () => {
    it('renders component as expected', () => {
      const disabled = 'disabled'
      const companyId = 'companyId'
      const operation = {
        callable: OperationCallableTypes.DISABLED,
        messages: []
      }

      mockedOperation.mockImplementationOnce(({ render: renderOperation }) =>
        renderOperation(disabled)
      )

      renderComponent({
        companyId,
        operation
      })

      expect(mockedUseCreateClaimerModal).toHaveBeenCalledTimes(1)
      expect(mockedUseCreateClaimerModal).toHaveBeenCalledWith(companyId)
      expect(mockedUseActionLoading).toHaveBeenCalledTimes(1)
      expect(mockedUseActionLoading).toHaveBeenCalledWith(
        `company-${companyId}`
      )
      expect(mockedOperation).toHaveBeenCalledTimes(1)
      expect(mockedOperation).toHaveBeenCalledWith(
        {
          operation,
          render: expect.any(Function)
        },
        {}
      )
      expect(mockedButton).toHaveBeenCalledTimes(1)
      expect(mockedButton).toHaveBeenCalledWith(
        {
          variant: 'primary',
          size: 'small',
          titleCase: false,
          onClick: showModal,
          disabled: 'disabled',
          'data-testid': 'create-claimer-button',
          children: 'Claim'
        },
        {}
      )
    })
  })

  describe('when passing a custom title', () => {
    it('renders component with custom title', () => {
      const disabled = {}
      const companyId = 'companyId'
      const buttonTitle = 'buttonTitle'
      const operation = {
        callable: OperationCallableTypes.DISABLED,
        messages: []
      }

      mockedOperation.mockImplementationOnce(({ render: renderOperation }) =>
        renderOperation(disabled)
      )

      renderComponent({
        companyId,
        operation,
        buttonTitle
      })

      expect(mockedButton).toHaveBeenCalledTimes(1)
      expect(mockedButton).toHaveBeenCalledWith(
        expect.objectContaining({ children: buttonTitle }),
        {}
      )
    })
  })
})
