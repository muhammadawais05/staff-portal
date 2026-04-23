import React from 'react'
import { render } from '@testing-library/react'
import { Typography } from '@toptal/picasso'
import { JobStatus } from '@staff-portal/jobs'
import { DetailedList } from '@staff-portal/ui'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

import { ClientJobFragment } from '../../data/get-client-jobs.staff.gql.types'
import EngagementsList from '../EngagementsList/EngagementsList'
import JobListItemTable from './JobListItemTable'

jest.mock('@toptal/picasso', () => ({
  Typography: jest.fn()
}))
jest.mock('@staff-portal/jobs', () => ({
  JobStatus: jest.fn()
}))
jest.mock('@staff-portal/date-time-utils', () => ({
  getDateDistanceFromNow: jest.fn()
}))
jest.mock('@staff-portal/ui', () => {
  const DetailedListMock = jest.fn() as unknown as {
    Row: jest.Mock
    Item: jest.Mock
  }

  DetailedListMock.Row = jest.fn()
  DetailedListMock.Item = jest.fn()

  return {
    DetailedList: DetailedListMock,
    SubSection: jest.fn()
  }
})
jest.mock('../EngagementsList/EngagementsList', () => ({
  __esModule: true,
  default: jest.fn()
}))

const TypographyMock = Typography as unknown as jest.Mock
const JobStatusMock = JobStatus as jest.Mock
const EngagementsListMock = EngagementsList as jest.Mock
const DetailedListMock = DetailedList as unknown as jest.Mock
const DetailedListRowMock = DetailedList.Row as unknown as jest.Mock
const DetailedListItemMock = DetailedList.Item as unknown as jest.Mock
const getDateDistanceFromNowMock = getDateDistanceFromNow as jest.Mock

const getJobMock = (postedAt?: string) =>
  ({
    postedAt,
    engagements: { nodes: Symbol() }
  } as unknown as ClientJobFragment)

describe('JobListItemTable', () => {
  beforeEach(() => {
    DetailedListMock.mockImplementation(({ children }) => children)
    DetailedListRowMock.mockImplementation(({ children }) => children)
    DetailedListItemMock.mockImplementation(({ children }) => children)
    JobStatusMock.mockReturnValue(null)
    TypographyMock.mockReturnValue(null)
    EngagementsListMock.mockReturnValue(null)
    getDateDistanceFromNowMock.mockReturnValue('getDateDistanceFromNow')
  })

  it('JobStatus is called with job prop only', () => {
    const jobMock = getJobMock()

    render(<JobListItemTable job={jobMock} />)

    expect(TypographyMock).not.toHaveBeenCalled()
    expect(JobStatusMock).toHaveBeenCalledWith({ job: jobMock }, {})
    expect(EngagementsListMock).toHaveBeenCalledWith(
      { engagements: jobMock.engagements?.nodes },
      {}
    )
  })

  it('`Job Posted` column is rendered if `datePosted` is defined', () => {
    const jobMock = getJobMock('postedAt')

    render(<JobListItemTable job={jobMock} />)

    expect(TypographyMock).toHaveBeenCalledWith(
      { children: 'getDateDistanceFromNow' },
      {}
    )
  })
})
