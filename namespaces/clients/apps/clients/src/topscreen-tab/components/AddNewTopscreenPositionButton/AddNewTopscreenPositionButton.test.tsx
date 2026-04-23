import React from 'react'
import { render, cleanup, screen, fireEvent, act } from '@testing-library/react'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { OperationFragment } from '@staff-portal/operations'

import { useAddNewTopscreenPositionModal } from '../../../modals/components/AddNewTopscreenPositionModal/hooks/use-add-new-topscreen-position-modal'
import AddNewTopscreenPositionButton from '.'

jest.mock(
  '../../../modals/components/AddNewTopscreenPositionModal/hooks/use-add-new-topscreen-position-modal'
)
const useModalMock = useAddNewTopscreenPositionModal as jest.Mock

const mockedEnabledOperationValue = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const mockedModalHookValue = {
  showModal: jest.fn()
}
const mockedDisabledOperationValue = {
  callable: OperationCallableTypes.DISABLED,
  messages: ['test-purpose-not-enabled']
}

const arrangeTest = (
  params?: Partial<{ topscreenClientId: string; operation: OperationFragment }>
) => {
  const props = {
    topscreenClientId: params?.topscreenClientId || '111-222',
    operation: params?.operation || mockedEnabledOperationValue
  }

  return render(
    <TestWrapper>
      <AddNewTopscreenPositionButton {...props} />
    </TestWrapper>
  )
}

describe('AddNewTopscreenPositionButton', () => {
  describe('when operation enabled', () => {
    beforeEach(() => {
      useModalMock.mockReturnValue(mockedModalHookValue)
    })

    afterEach(cleanup)

    it('renders component', () => {
      arrangeTest()

      expect(
        screen.getByRole('button', { name: 'Add New TopScreen Position' })
      ).toBeInTheDocument()
    })

    it('display modal on click', async () => {
      arrangeTest()

      await act(async () => {
        fireEvent.click(
          screen.getByRole('button', { name: 'Add New TopScreen Position' })
        )
      })

      expect(mockedModalHookValue.showModal).toHaveBeenCalledTimes(1)
    })
  })

  describe('when operation disabled', () => {
    beforeEach(() => {
      useModalMock.mockReturnValue(mockedModalHookValue)
    })

    afterEach(cleanup)

    it('display tooltip', async () => {
      arrangeTest({
        operation: mockedDisabledOperationValue
      })

      await act(async () => {
        fireEvent.mouseOver(
          screen.getByRole('button', { name: 'Add New TopScreen Position' })
        )
      })

      assertOnTooltip(
        screen.getByRole('button', { name: 'Add New TopScreen Position' }),
        tooltip => expect(tooltip).toHaveTextContent('test-purpose-not-enabled')
      )
    })

    it('disable button', async () => {
      arrangeTest({
        operation: mockedDisabledOperationValue
      })

      await act(async () => {
        fireEvent.click(
          screen.getByRole('button', { name: 'Add New TopScreen Position' })
        )
      })

      expect(mockedModalHookValue.showModal).not.toHaveBeenCalled()
    })
  })
})
