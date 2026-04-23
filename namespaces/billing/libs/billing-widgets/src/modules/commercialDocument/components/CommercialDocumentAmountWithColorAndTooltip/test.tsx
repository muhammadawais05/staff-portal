import { merge } from 'lodash-es'
import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import CommercialDocumentAmountWithColorAndTooltip from './CommercialDocumentAmountWithColorAndTooltip'

type Document = ComponentProps<
  typeof CommercialDocumentAmountWithColorAndTooltip
>['document']
type IconPosition = ComponentProps<
  typeof CommercialDocumentAmountWithColorAndTooltip
>['iconPosition']
type DocumentPart = Partial<Document>

const mergeDocument = (mock: Document, variables: DocumentPart) =>
  merge(mock, variables)

const mergeInvoice = (variables: DocumentPart) =>
  mergeDocument(fixtures.MockInvoice, variables)

const mergePayment = (variables: DocumentPart) =>
  mergeDocument(fixtures.MockPayment, variables)

const render = (document: Document, iconPosition?: IconPosition) =>
  renderComponent(
    <CommercialDocumentAmountWithColorAndTooltip
      document={document}
      iconPosition={iconPosition}
    />
  )

describe('CommercialDocumentAmountWithColorAndTooltip', () => {
  it('invoice render without tooltip', () => {
    const { container } = render(
      mergeInvoice({
        status: DocumentStatus.PAID
      })
    )

    expect(container).toMatchSnapshot()
  })

  it('payment render without tooltip', () => {
    const { container } = render(
      mergePayment({
        status: DocumentStatus.PAID
      })
    )

    expect(container).toMatchSnapshot()
  })

  it('with tooltip when preferredBillingOption is discountable', () => {
    const { container } = render(
      mergeInvoice({
        discountApplied: true,
        status: DocumentStatus.OUTSTANDING,
        subjectObject: {
          country: {
            name: 'United States'
          },
          preferredBillingOption: {
            discountable: true
          }
        }
      })
    )

    expect(container).toMatchSnapshot()
  })

  it('with tooltip when preferredBillingOption is not discountable', () => {
    const { container } = render(
      mergeInvoice({
        discountApplied: true,
        status: DocumentStatus.OUTSTANDING,
        subjectObject: {
          country: {
            name: 'United States'
          },
          preferredBillingOption: {
            discountable: false
          }
        }
      })
    )

    expect(container).toMatchSnapshot()
  })

  it('with icon tooltip rendered before amount (position: left)', () => {
    const { container } = render(
      mergeInvoice({
        discountApplied: true,
        status: DocumentStatus.OUTSTANDING,
        subjectObject: {
          country: {
            name: 'United States'
          },
          preferredBillingOption: {
            discountable: false
          }
        }
      }),
      'left'
    )

    expect(container).toMatchSnapshot()
  })
})
