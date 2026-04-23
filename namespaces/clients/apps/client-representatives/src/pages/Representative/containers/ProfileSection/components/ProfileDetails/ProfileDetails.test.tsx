import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { render } from '@testing-library/react'
import { NO_VALUE } from '@staff-portal/config'
import { RepresentativeFragment } from '@staff-portal/client-representatives'

import ProfileDetails from './ProfileDetails'
import { useRepresentativeListItems } from '../../services/use-representative-list-items'

const REPRESENTATIVE = {} as RepresentativeFragment
const ITEMS = {}

jest.mock('../../services/use-representative-list-items', () => ({
  useRepresentativeListItems: jest.fn()
}))

jest.mock('@staff-portal/ui', () => ({
  DetailedList: jest.fn()
}))

const DetailedListMock = DetailedList as unknown as jest.Mock

const useRepresentativeListItemsMock = useRepresentativeListItems as jest.Mock

describe('ProfileDetails', () => {
  beforeEach(() => {
    useRepresentativeListItemsMock.mockReturnValue(ITEMS)
    DetailedListMock.mockReturnValue(null)
  })

  it('renders DetailedList with correct props passed', () => {
    render(<ProfileDetails representative={REPRESENTATIVE} />)

    expect(useRepresentativeListItemsMock).toHaveBeenCalledTimes(1)
    expect(useRepresentativeListItemsMock).toHaveBeenCalledWith(REPRESENTATIVE)

    expect(DetailedListMock).toHaveBeenCalledTimes(1)
    expect(DetailedListMock).toHaveBeenCalledWith(
      {
        items: ITEMS,
        columns: 1,
        labelColumnWidth: 12,
        defaultValue: NO_VALUE
      },
      {}
    )
  })
})
