import React from 'react'
import { screen, render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { FieldCheckResult } from '@staff-portal/graphql/staff'

import JobSummaryCompanyLevelSection from './JobSummaryCompanyLevelSection'
import { GetCompanyLevelDataQuery } from './data/get-company-level-data/get-company-level-data.staff.gql.types'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

const JOB_ID = '123'

const mockUseGetNode = useGetNode as jest.Mock

const getMock = (node?: GetCompanyLevelDataQuery['node']) => ({
  id: JOB_ID,
  client: {
    legalName: 'Okuneva-Schuppe CE',
    ...node?.client,
    contact: {
      fullName: 'Bobbye Bode',
      ...node?.client.contact
    },
    timeZone: {
      name: '(UTC-02:00) Argentina - Buenos Aires',
      ...node?.client.timeZone
    },
    representatives: {
      nodes: [
        {
          id: 'someid1',
          main: false,
          position: null
        }
      ],
      ...node?.client.representatives
    }
  },
  fieldCheck: node?.fieldCheck
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobSummaryCompanyLevelSection jobId={JOB_ID} />
    </TestWrapper>
  )

describe('JobSummaryCompanyLevelSection', () => {
  it('shows Company field', () => {
    const clientLegalName = 'Test Company Name'

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        client: { legalName: clientLegalName }
      } as GetCompanyLevelDataQuery['node']),
      loading: false
    }))

    arrangeTest()

    const companyField = screen.getByText(clientLegalName)

    expect(companyField).toBeInTheDocument()
  })

  it('shows POC Role field when representative is main contact and has position', () => {
    const positionName = 'Test Poc Name'

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        client: {
          representatives: {
            nodes: [
              {
                main: true,
                position: positionName
              }
            ]
          }
        }
      } as GetCompanyLevelDataQuery['node']),
      loading: false
    }))

    arrangeTest()

    const pocRoleContent = screen.getByText(positionName)

    expect(pocRoleContent).toBeInTheDocument()
  })

  it('shows Primary Contact field', () => {
    const contactName = 'Joseph Garret'

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        client: {
          contact: {
            fullName: contactName
          }
        }
      } as GetCompanyLevelDataQuery['node']),
      loading: false
    }))

    arrangeTest()

    const primaryContactName = screen.getByText(contactName)

    expect(primaryContactName).toBeInTheDocument()
  })

  it('shows Client Time Zone field with filled icon', () => {
    const timezoneName = '(UTC-07:00) America - Los Angeles'

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        client: {
          timeZone: {
            name: timezoneName
          }
        },
        fieldCheck: {
          companyTimeZone: FieldCheckResult.COMPLETE
        }
      } as GetCompanyLevelDataQuery['node']),
      loading: false
    }))

    arrangeTest()

    const clientTimezone = screen.getByText(timezoneName)
    const filledIcon = screen.getByTestId('SummaryField-green-icon')

    expect(clientTimezone).toBeInTheDocument()
    expect(filledIcon).toBeInTheDocument()
  })

  it('shows No Value for Client Time Zone field with not filled icon', () => {
    const timezoneName = '(UTC-07:00) America - Los Angeles'

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        client: {
          timeZone: { name: null }
        },
        fieldCheck: {
          companyTimeZone: FieldCheckResult.EMPTY
        }
      } as unknown as GetCompanyLevelDataQuery['node']),
      loading: false
    }))

    arrangeTest()

    const clientTimezone = screen.queryByText(timezoneName)
    const notFilledIcon = screen.getByTestId('SummaryField-red-icon')

    expect(clientTimezone).not.toBeInTheDocument()
    expect(notFilledIcon).toBeInTheDocument()
  })
})
