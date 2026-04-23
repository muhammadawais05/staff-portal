import { merge } from 'lodash-es'
import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoiceAmountWithColorAndTooltip from './InvoiceAmountWithColorAndTooltip'

const render = (
  variables?: Partial<
    ComponentProps<typeof InvoiceAmountWithColorAndTooltip>['invoice']
  >,
  iconPosition?: ComponentProps<
    typeof InvoiceAmountWithColorAndTooltip
  >['iconPosition']
) => {
  const invoice = merge(fixtures.MockInvoice, variables)

  return renderComponent(
    <InvoiceAmountWithColorAndTooltip
      invoice={invoice}
      iconPosition={iconPosition}
    />
  )
}

describe('InvoiceAmountWithColorAndTooltip', () => {
  it('default render without tooltip', () => {
    const { container } = render({
      status: DocumentStatus.PAID
    })

    expect(container).toMatchSnapshot()
  })

  it('with tooltip when preferredBillingOption is discountable', () => {
    const { container } = render({
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

    expect(container).toMatchSnapshot()
  })

  it('with tooltip when preferredBillingOption is not discountable', () => {
    const { container } = render({
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

    expect(container).toMatchSnapshot()
  })

  it('with icon tooltip rendered before amount (position: left)', () => {
    const { container } = render(
      {
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
      },
      'left'
    )

    expect(container).toMatchSnapshot()
  })
})
