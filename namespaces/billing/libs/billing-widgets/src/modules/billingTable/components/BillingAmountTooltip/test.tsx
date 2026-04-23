import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingAmountTooltip from '.'

const render = (props: ComponentProps<typeof BillingAmountTooltip>) =>
  renderComponent(<BillingAmountTooltip {...props} />)

describe('BillingAmountTooltip', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      data: {
        status: DocumentStatus.PAID,
        subjectObject: { fullName: 'John Doe' }
      },
      children: <span>Children Test</span>
    })

    expect(queryByTestId('Tooltip-content')).toContainHTML('Paid, John Doe')
    expect(queryByTestId('Tooltip-children')).toContainHTML('Children Test')
  })
})
