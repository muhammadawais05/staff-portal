import MockDate from 'mockdate'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { screen } from '@testing-library/react'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import DisputeForm from '.'

jest.mock('@staff-portal/billing/src/_lib/form/fieldValidators')
jest.mock('@staff-portal/billing/src/components/ModalFooter')

type PropsWithoutSubmitHandler = Omit<
  ComponentProps<typeof DisputeForm>,
  'handleSubmit'
>

const render = (props?: Partial<PropsWithoutSubmitHandler>) => {
  const defaultProps: PropsWithoutSubmitHandler = {
    nodeId: '123456',
    nodeType: CommercialDocumentType.invoice,
    initialValues: {
      comment: ''
    }
  }

  return renderComponent(
    <DisputeForm {...defaultProps} {...props} handleSubmit={jest.fn()} />
  )
}

describe('DisputeForm', () => {
  beforeEach(() => {
    MockDate.set('2019/06/15')
  })

  afterEach(() => {
    MockDate.reset()
  })

  describe('when document is invoice', () => {
    describe('when action is Request Dispute', () => {
      describe('without pending talent payments', () => {
        it("renders without 'Include talent payments' checkbox", () => {
          render()

          expect(
            screen.queryByTestId('disputeTalentPayments')
          ).not.toBeInTheDocument()
        })
      })

      describe('with pending talent payments', () => {
        it("renders with 'Include talent payments' checkbox", () => {
          render({ includeTalentPayments: true })

          expect(
            screen.getByTestId('disputeTalentPayments')
          ).toBeInTheDocument()
        })
      })
    })

    describe('when action is Update Dispute', () => {
      it('renders date and comment fields only', () => {
        render()

        expect(screen.getByTestId('actionDueOn')).toBeInTheDocument()
        expect(screen.getByTestId('comment')).toBeInTheDocument()
        expect(
          screen.queryByTestId('disputeTalentPayments')
        ).not.toBeInTheDocument()
      })
    })
  })

  describe('when document is payment', () => {
    it('renders comment field only', () => {
      render({ nodeType: CommercialDocumentType.payment })

      expect(screen.getByTestId('comment')).toBeInTheDocument()
      expect(screen.queryByTestId('actionDueOn')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('disputeTalentPayments')
      ).not.toBeInTheDocument()
    })
  })
})
