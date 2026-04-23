import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { FiltersWithoutHeader } from '@staff-portal/filters'

import { JobsFilterType } from '../../enums'
import JobsFilter, { JobsFiltersValues } from './JobsFilter'

jest.mock('@staff-portal/filters', () => ({
  ...jest.requireActual('@staff-portal/filters'),
  FiltersWithoutHeader: jest.fn()
}))

const FiltersWithoutHeaderMock = FiltersWithoutHeader as unknown as jest.Mock

const filterValues: JobsFiltersValues = {
  jobsFilter: [JobsFilterType.IN_EVALUATION, JobsFilterType.WORKING]
}
const onChange = jest.fn()

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobsFilter values={filterValues} onChange={onChange} />
    </TestWrapper>
  )

describe('JobsFilter', () => {
  beforeEach(() => {
    FiltersWithoutHeaderMock.mockImplementation(() => <div />)
  })

  it('passes filter values to internal filter component', () => {
    arrangeTest()

    expect(FiltersWithoutHeaderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        values: filterValues,
        onChange
      }),
      expect.anything()
    )
  })
})
