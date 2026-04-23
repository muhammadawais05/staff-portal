import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TransfersTable from '.'

jest.mock('../TableHead')
jest.mock('../TableRow')

const render = (props: ComponentProps<typeof TransfersTable>) =>
  renderComponent(<TransfersTable {...props} />)

describe('TransfersTable', () => {
  it('render Table', () => {
    const { getByTestId } = render({
      onTransferActionClick: jest.fn(),
      transfers: fixtures.MockTransfers.nodes
    })

    expect(getByTestId('TransfersTableHead')).toBeInTheDocument()
    expect(
      getByTestId('TransfersTable-row-VjEtVHJhbnNmZXItNTg5MDMw')
    ).toBeInTheDocument()
    expect(
      getByTestId('TransfersTable-row-VjEtVHJhbnNmZXItNTg5MDM2')
    ).toBeInTheDocument()
    expect(
      getByTestId('TransfersTable-row-VjEtVHJhbnNmZXItNTg5MDMa')
    ).toBeInTheDocument()
  })
})
