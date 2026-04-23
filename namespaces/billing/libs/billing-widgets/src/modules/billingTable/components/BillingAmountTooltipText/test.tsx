import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingAmountTooltipText from '.'

const render = (props: ComponentProps<typeof BillingAmountTooltipText>) =>
  renderComponent(<BillingAmountTooltipText {...props} />)

describe('BillingAmountTooltipText', () => {
  it('default render', () => {
    const { queryByText } = render({
      data: {
        status: DocumentStatus.PAID,
        subjectObject: { fullName: 'John Doe' }
      },
      postText: 'testPost',
      preText: 'testPre'
    })

    expect(queryByText('Paid, John Doe')).toBeInTheDocument()
  })
})
