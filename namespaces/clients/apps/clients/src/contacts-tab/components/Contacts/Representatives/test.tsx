import { render } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { SubSection } from '@staff-portal/ui'
import { RepresentativeFragment } from '@staff-portal/client-representatives'

import Representative from '../Representative'
import { Representatives } from './Representatives'

const renderComponent = ({
  companyId,
  representatives
}: {
  companyId: string
  representatives: RepresentativeFragment[]
}) =>
  render(
    <TestWrapper>
      <Representatives
        companyId={companyId}
        representatives={representatives}
      />
    </TestWrapper>
  )

jest.mock('@staff-portal/ui', () => ({
  SubSection: jest.fn()
}))

jest.mock('../Representative', () => ({
  __esModule: true,
  default: jest.fn()
}))

const mockedSubSection = SubSection as jest.Mock
const mockedRepresentative = Representative as jest.Mock

describe('Representatives', () => {
  beforeEach(() => {
    mockedSubSection.mockImplementationOnce(({ children }) => <>{children}</>)
    mockedRepresentative.mockReturnValueOnce(null)
  })

  it('renders nothing if there are no representatives', () => {
    const props = {
      companyId: '1',
      representatives: []
    }

    renderComponent(props)

    expect(mockedSubSection).toHaveBeenCalledTimes(0)
  })

  it('renders with correct props', () => {
    const props = {
      companyId: '1',
      representatives: [
        {
          __typename: 'CompanyRepresentative',
          id: 'representative-1',
          fullName: 'Represenative',
          client: {
            id: 'client-1'
          }
        } as RepresentativeFragment
      ]
    }

    renderComponent(props)

    expect(mockedSubSection).toHaveBeenCalledTimes(1)
    expect(mockedSubSection).toHaveBeenCalledWith(
      expect.objectContaining({
        last: true
      }),
      {}
    )

    expect(mockedRepresentative).toHaveBeenCalledTimes(1)
    expect(mockedRepresentative).toHaveBeenCalledWith(
      expect.objectContaining({
        isSubsidiary: true,
        representative: props.representatives[0]
      }),
      {}
    )
  })
})
