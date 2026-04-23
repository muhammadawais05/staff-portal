import { fireEvent } from '@toptal/picasso/test-utils'
import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TimesheetModalFooter from '.'

jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (
  children: ReactNode,
  props: ComponentProps<typeof TimesheetModalFooter>
) =>
  renderComponent(
    <TimesheetModalFooter {...props}>{children}</TimesheetModalFooter>
  )

const mockHandleNavigateTo: jest.Mock = jest.fn()

let mockModalState = () => ({
  modal: {
    options: { variant: 'normal' },
    props: {
      normal: {
        canMoveNext: true,
        canMovePrev: true,
        handleNavigateTo: mockHandleNavigateTo
      }
    }
  }
})

jest.mock('@staff-portal/billing/src/store', () => ({
  useStore: () => ({
    dispatch: jest.fn(),
    state: mockModalState()
  })
}))

describe('TimesheetModalFooter', () => {
  describe('Normal cases', () => {
    it('default render', () => {
      const { getByText } = render(<h1>Sample text</h1>, {})

      expect(getByText('Sample text')).toBeInTheDocument()
    })

    it('click on `Move Prev`', () => {
      const { getByTestId } = render(<h1>Test</h1>, {})

      fireEvent.click(getByTestId('movePrev'))

      expect(mockHandleNavigateTo).toHaveBeenCalled()
    })

    it('click on `Move Next`', () => {
      const { getByTestId } = render(<h1>Test</h1>, {})

      fireEvent.click(getByTestId('moveNext'))

      expect(mockHandleNavigateTo).toHaveBeenCalled()
    })
  })

  describe('Special cases', () => {
    it('no navigateTo callback available', () => {
      mockModalState = () => ({
        modal: {
          options: { variant: 'normal' },
          props: {}
        }
      })

      const { queryByTestId } = render(<h1>Test</h1>, {})

      expect(queryByTestId('movePrev')).not.toBeInTheDocument()
      expect(queryByTestId('moveNext')).not.toBeInTheDocument()
    })
  })
})
