import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import MyExpectedCommissionsListTableRow from '.'

jest.mock('../ExpectedCommissionShortDescription')

const expectedCommission = {
  ...fixtures.MockExpectedCommissionsList.expectedCommissions.groups[0]
    .expectedCommissions[0]
}

const render = (
  props: ComponentProps<typeof MyExpectedCommissionsListTableRow>
) =>
  renderComponent(
    <Table>
      <Table.Body>
        <MyExpectedCommissionsListTableRow {...props} />
      </Table.Body>
    </Table>
  )

describe('MyExpectedCommissionsListTableRow', () => {
  it('default render', () => {
    const { getByTestId } = render({
      expectedCommission
    })

    expect(
      getByTestId(
        `MyExpectedCommissionsListTableRow-expectedCommission-${expectedCommission.id}`
      )
    ).toBeInTheDocument()
  })
})
