import React from 'react'
import { render } from '@testing-library/react'
import { ClientEnterpriseAccountStatusEnum } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { titleize } from '@staff-portal/string'

import EnterpriseAccountStatusView from './EnterpriseAccountStatusView'

jest.mock('@staff-portal/string', () => ({
  ...jest.requireActual('@staff-portal/string'),
  titleize: jest.fn()
}))

const mockedTitleize = titleize as jest.Mock

describe('EnterpriseAccountStatusView', () => {
  it('renders component and checks that correct value was printed', () => {
    const status = ClientEnterpriseAccountStatusEnum.ACTIVE

    mockedTitleize.mockReturnValueOnce(null)

    render(
      <TestWrapper>
        <EnterpriseAccountStatusView status={status} />
      </TestWrapper>
    )

    expect(mockedTitleize).toHaveBeenCalledTimes(1)
    expect(mockedTitleize).toHaveBeenCalledWith(status, {
      capitalizeAllWords: false
    })
  })
})
