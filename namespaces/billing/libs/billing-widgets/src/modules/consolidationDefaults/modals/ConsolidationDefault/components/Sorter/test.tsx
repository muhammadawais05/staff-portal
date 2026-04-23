import React, { ComponentProps } from 'react'
import { screen } from '@toptal/picasso/test-utils'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Sorter from '.'
import { SortField } from '../../utils'

const render = (props: ComponentProps<typeof Sorter>) =>
  renderComponent(<Sorter {...props} />)

const sortFields: SortField[] = [
  {
    name: 'startDate',
    label: 'Start Date',
    dataType: 'date'
  },
  {
    name: 'talent.fullName',
    label: 'Talent',
    dataType: 'string'
  },
  {
    name: 'effectivePurchaseOrder.poNumber',
    label: 'PO Number',
    dataType: 'number'
  }
]

describe('Sorter', () => {
  it('default render', () => {
    render({
      sortFields,
      onValueChange: jest.fn()
    })

    expect(screen.queryByLabelText('Start Date')).toBeInTheDocument()
    expect(screen.queryByLabelText('Talent')).toBeInTheDocument()
    expect(screen.queryByLabelText('PO Number')).toBeInTheDocument()
  })
})
