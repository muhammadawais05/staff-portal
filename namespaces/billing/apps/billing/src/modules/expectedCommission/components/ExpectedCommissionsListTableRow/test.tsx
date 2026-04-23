import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import ExpectedCommissionsListTableRow from '.'

jest.mock('../ExpectedCommissionShortDescription')

const expectedCommission = {
  ...fixtures.MockExpectedCommissionsList.expectedCommissions.groups[0]
    .expectedCommissions[0]
}

const render = (
  props: ComponentProps<typeof ExpectedCommissionsListTableRow>
) =>
  renderComponent(
    <Table>
      <Table.Body>
        <ExpectedCommissionsListTableRow {...props} />
      </Table.Body>
    </Table>
  )

describe('ExpectedCommissionsListTableRow', () => {
  it('default render', () => {
    const { getByTestId } = render({
      expectedCommission
    })

    expect(
      getByTestId(
        `ExpectedCommissionsListTableRow-expectedCommission-${expectedCommission.id}`
      )
    ).toBeInTheDocument()
  })
})
