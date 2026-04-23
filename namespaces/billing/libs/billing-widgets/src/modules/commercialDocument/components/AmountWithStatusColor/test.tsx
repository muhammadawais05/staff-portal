import React, { ComponentProps } from 'react'
import { DocumentStatus } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AmountWithStatusColor from './AmountWithStatusColor'

const render = (props: ComponentProps<typeof AmountWithStatusColor>) =>
  renderComponent(<AmountWithStatusColor {...props} />)

describe('AmountWithStatusColor', () => {
  it('renders Amount and Typography properly', () => {
    const { getByTestId } = render({
      amount: 500.15,
      status: DocumentStatus.PAID,
      'data-testid': 'AmountWithStatusColor'
    })

    expect(getByTestId('AmountWithStatusColor').className).toContain(
      'PicassoTypography-green'
    )
    expect(getByTestId('AmountWithStatusColor')).toContainHTML('$500.15')
  })
})
