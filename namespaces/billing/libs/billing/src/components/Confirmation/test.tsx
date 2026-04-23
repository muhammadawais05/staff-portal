import React, { ComponentProps, ReactNode } from 'react'

import Confirmation from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof Confirmation>
) => renderComponent(<Confirmation {...props}>{children}</Confirmation>)

describe('Confirmation', () => {
  describe('default render', () => {
    it('default render', () => {
      const { container } = render(null, {
        actionTitle: 'example action',
        onSuccess: jest.fn()
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('all possible props', () => {
    it('default render', () => {
      const { container } = render(null, {
        actionIsDisabled: true,
        actionIsLoading: true,
        actionTitle: 'example action',
        actionVariant: 'primary',
        cancelTitle: 'example cancel',
        cancelVariant: 'secondary-red',
        description: 'example description',
        notice: 'example notice',
        onCancel: jest.fn(),
        onSuccess: jest.fn(),
        title: 'example title'
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('#handleOnCancel', () => {
    let mockHandleOnCloseConfirmation = jest.fn()
    let mockOnCancel = jest.fn()

    describe('when `onCancel` defined', () => {
      it('calls functions properly', () => {
        mockOnCancel = jest.fn()
        mockHandleOnCloseConfirmation = jest.fn()
        // @ts-ignore
        Confirmation.handleOnCancel({
          handleOnCloseConfirmation: mockHandleOnCloseConfirmation,
          onCancel: mockOnCancel
        })()

        expect(mockOnCancel).toHaveBeenCalledTimes(1)
        expect(mockHandleOnCloseConfirmation).toHaveBeenCalledTimes(1)
      })
    })

    describe('when `onCancel` undefined', () => {
      it('calls functions properly', () => {
        mockHandleOnCloseConfirmation = jest.fn()
        // @ts-ignore
        Confirmation.handleOnCancel({
          handleOnCloseConfirmation: mockHandleOnCloseConfirmation,
          onCancel: undefined
        })()

        expect(mockHandleOnCloseConfirmation).toHaveBeenCalledTimes(1)
      })
    })
  })
})
