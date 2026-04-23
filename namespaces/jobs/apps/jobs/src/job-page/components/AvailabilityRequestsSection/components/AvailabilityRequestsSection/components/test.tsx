import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { AvailabilityRequestStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { FiltersWithoutHeader } from '@staff-portal/filters'

import AvailabilityRequestsFilter from './AvailabilityRequestsFilter'

jest.mock('@staff-portal/filters', () => ({
  ...jest.requireActual('@staff-portal/filters'),
  FiltersWithoutHeader: jest.fn()
}))

const FiltersWithoutHeaderMock = FiltersWithoutHeader as unknown as jest.Mock

const filterStatus: AvailabilityRequestStatus =
  AvailabilityRequestStatus.WITHDRAWN

const onChange = jest.fn()

const arrangeTest = () => {
  FiltersWithoutHeaderMock.mockImplementation(() => <div />)

  return render(
    <TestWrapper>
      <AvailabilityRequestsFilter values={filterStatus} onChange={onChange} />
    </TestWrapper>
  )
}

describe('AvailabilityRequestsFilter', () => {
  it('passes filter values to internal filter component', () => {
    arrangeTest()

    expect(FiltersWithoutHeaderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        values: { status: filterStatus }
      }),
      expect.anything()
    )
  })
})
