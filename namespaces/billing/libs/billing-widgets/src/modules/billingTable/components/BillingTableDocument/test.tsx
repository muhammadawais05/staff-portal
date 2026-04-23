import React, { ComponentProps, ReactNode } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingTableDocument from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof BillingTableDocument>
) =>
  renderComponent(
    <BillingTableDocument {...props}>{children}</BillingTableDocument>
  )

const MockDoc = fixtures.MockDocument

const testIdPrefix = 'BillingTableDocument'
const testIdAdjust = 'BillingAmountAdjustment'

describe('BillingTableDocument', () => {
  describe('Special cases', () => {
    it('With child adjustments', () => {
      const { queryByTestId } = render(null, {
        document: {
          ...MockDoc
        },
        hasChildAdjustments: true
      })

      expect(queryByTestId(`${testIdPrefix}-amount`)).toContainHTML('952.14')
      expect(queryByTestId(`${testIdPrefix}-exclamationMark`)).not.toBeNull()
    })
  })

  describe('Adjustments variants', () => {
    it('`Adjustments` `credit` variant render', () => {
      const { queryByTestId } = render(null, {
        document: {
          ...MockDoc,
          creditedAmount: '-15.2',
          debitedAmount: '0',
          status: DocumentStatus.DUE,
          subjectObject: { id: 'abc123', fullName: 'example name' },
          url: 'example.com/link'
        }
      })

      expect(
        queryByTestId(`${testIdPrefix}-tooltip_tooltip-text`)
      ).toContainHTML('Due, example name')
      expect(queryByTestId(`${testIdAdjust}-Label`)).toContainHTML('Credits:')
      expect(queryByTestId(`${testIdAdjust}-Amount`)).toContainHTML('-$15.20')
      expect(queryByTestId(`${testIdPrefix}-link`)).toContainHTML(
        'example.com/link'
      )
    })

    it('`Adjustments` `debit` variant render', () => {
      const { queryByTestId } = render(null, {
        document: {
          ...MockDoc,
          debitedAmount: '-15.2',
          creditedAmount: '0',
          status: DocumentStatus.DUE
        }
      })

      expect(
        queryByTestId(`${testIdPrefix}-tooltip_tooltip-text`)
      ).toContainHTML('Due,')
      expect(queryByTestId(`${testIdAdjust}-Label`)).toContainHTML('Debits:')
      expect(queryByTestId(`${testIdAdjust}-Amount`)).toContainHTML('-$15.20')
    })
  })
})
