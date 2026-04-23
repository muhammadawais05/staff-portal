import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@testing-library/react'
import { Filters } from '@staff-portal/filters'
import {
  RateChangeRequestTypeEnum,
  RateChangeRequestStatus
} from '@staff-portal/graphql/staff'
import { TalentAutocompleteField } from '@staff-portal/talents'

import RateChangeRequestListFilters from './RateChangeRequestListFilters'

jest.mock('@staff-portal/filters', () => ({
  ...jest.requireActual('@staff-portal/filters'),
  Filters: jest.fn()
}))

jest.mock(
  '@staff-portal/talents/src/components/TalentAutocompleteField',
  () => ({
    __esModule: true,
    default: jest.fn()
  })
)

const mockedFilters = Filters as unknown as jest.Mock
const mockedTalentAutocompleteField = TalentAutocompleteField as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof RateChangeRequestListFilters>
) =>
  render(
    <TestWrapper>
      <RateChangeRequestListFilters {...props} />
    </TestWrapper>
  )

describe('RateChangeRequestListFilters', () => {
  beforeEach(() => {
    mockedTalentAutocompleteField.mockReturnValue(null)
    mockedFilters.mockImplementation(
      ({ children }: ComponentProps<typeof Filters>) => (
        <>{children ? children(null) : null}</>
      )
    )
  })

  it('renders filters and talent autocomplete', () => {
    const filterValues = {
      talentName: 'Test Talent Name',
      claimerId: '1',
      requestType: RateChangeRequestTypeEnum.CONSULTATION,
      statuses: [
        RateChangeRequestStatus.PENDING,
        RateChangeRequestStatus.CLAIMED
      ],
      page: '2'
    }

    arrangeTest({
      filterValues,
      onChange: jest.fn()
    })

    expect(mockedFilters).toHaveBeenCalledWith(
      expect.objectContaining({
        values: filterValues
      }),
      {}
    )
    expect(mockedTalentAutocompleteField).toHaveBeenCalledWith(
      expect.objectContaining({
        initialDisplayValue: 'Test Talent Name'
      }),
      {}
    )
  })
})
