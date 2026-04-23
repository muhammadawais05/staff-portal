import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AddModalFormFooter from '.'
jest.mock('@staff-portal/billing/src/components/ModalFooter')

const render = (props: ComponentProps<typeof AddModalFormFooter>) =>
  renderComponent(<AddModalFormFooter {...props} />)

describe('AddModalFormFooter', () => {
  describe('when its a confirm step', () => {
    describe('when its submitting', () => {
      it('default render', () => {
        const { getByTestId } = render({
          handleOnClick: jest.fn(),
          isConfirmStep: true,
          isSubmitting: true
        })

        expect(getByTestId('back')).toContainHTML('Back')
        expect(getByTestId('submit')).toBeDisabled()
      })
    })

    describe('when its not submitting', () => {
      it('default render', () => {
        const { getByTestId } = render({
          handleOnClick: jest.fn(),
          isConfirmStep: true,
          isSubmitting: false
        })

        expect(getByTestId('back')).toContainHTML('Back')
        expect(getByTestId('submit')).not.toBeDisabled()
      })
    })
  })

  describe('when its not a confirm step', () => {
    describe('when its submitting', () => {
      it('default render', () => {
        const { queryByTestId, getByRole } = render({
          handleOnClick: jest.fn(),
          isConfirmStep: false,
          isSubmitting: true
        })

        expect(
          getByRole('button', { name: name => name.includes('Continue') })
        ).toBeInTheDocument()
        expect(queryByTestId('submit')).not.toBeInTheDocument()
      })
    })
  })
})
