import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import Skeleton from '.'

describe('Skeleton List', () => {
  it.each`
    rows | columns | expectedBody | expectedRows
    ${0} | ${0}    | ${2}         | ${1}
    ${1} | ${0}    | ${2}         | ${2}
  `('<ListTable />', ({ rows, columns, expectedBody, expectedRows }) => {
    const { queryAllByRole } = renderComponent(
      <Skeleton.ListTable rowsCount={rows} columnsCount={columns} />
    )

    expect(queryAllByRole('rowgroup')).toHaveLength(expectedBody)
    expect(queryAllByRole('row')).toHaveLength(expectedRows)
  })
})
