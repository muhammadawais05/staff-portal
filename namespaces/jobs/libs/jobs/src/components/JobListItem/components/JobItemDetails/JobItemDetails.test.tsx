import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedList } from '@staff-portal/ui'
import { NO_VALUE } from '@staff-portal/config'
import MockDate from 'mockdate'

import { JobListItemFragment } from '../../data/job-list-item-fragment'
import { createJobListItemFragment } from '../../data/job-list-item-fragment/mocks'
import {
  JobFulfillmentStatus,
  JobStatus,
  JobTimeZoneField,
  JobContactsField,
  JobSpecializationField,
  ReadonlySkillList,
  IndustriesField,
  ClientLinkField,
  TalentField,
  UpdateInvoiceNoteModal,
  CommitmentField,
  JobTypeField
} from '../../../../components'
import {
  showJobFulfillmentStatus,
  shouldRenderCommitment
} from '../../../../utils'
import JobItemDetails from './JobItemDetails'

jest.mock('@staff-portal/ui', () => {
  const mock = jest.fn() as unknown as {
    Row: Function
    Item: Function
  }

  mock.Row = jest.fn()
  mock.Item = jest.fn()

  return {
    DetailedList: mock
  }
})

jest.mock('../../../../utils', () => ({
  showJobFulfillmentStatus: jest.fn(),
  shouldRenderCommitment: jest.fn()
}))

jest.mock('../../../../components', () => ({
  JobFulfillmentStatus: jest.fn(),
  JobStatus: jest.fn(),
  JobTimeZoneField: jest.fn(),
  JobContactsField: jest.fn(),
  JobSpecializationField: jest.fn(),
  ReadonlySkillList: jest.fn(),
  IndustriesField: jest.fn(),
  ClientLinkField: jest.fn(),
  TalentField: jest.fn(),
  UpdateInvoiceNoteModal: jest.fn(),
  CommitmentField: jest.fn(),
  JobTypeField: jest.fn()
}))

const mockedDetailedList = DetailedList as unknown as jest.Mock
const mockedDetailedListRow = DetailedList.Row as unknown as jest.Mock
const mockedDetailedListItem = DetailedList.Item as unknown as jest.Mock

const mockedJobFulfillmentStatus = JobFulfillmentStatus as unknown as jest.Mock
const mockedJobStatus = JobStatus as unknown as jest.Mock
const mockedClientLinkField = ClientLinkField as unknown as jest.Mock
const mockedCommitmentField = CommitmentField as unknown as jest.Mock
const mockedJobTypeField = JobTypeField as unknown as jest.Mock
const mockedJobContactsField = JobContactsField as unknown as jest.Mock
const mockedJobTimeZoneField = JobTimeZoneField as unknown as jest.Mock
const mockedTalentField = TalentField as unknown as jest.Mock
const mockedJobSpecializationField =
  JobSpecializationField as unknown as jest.Mock
const mockedReadonlySkillList = ReadonlySkillList as unknown as jest.Mock
const mockedIndustriesField = IndustriesField as unknown as jest.Mock
const mockedUpdateInvoiceNoteModal =
  UpdateInvoiceNoteModal as unknown as jest.Mock
const mockedShowJobFulfillmentStatus =
  showJobFulfillmentStatus as unknown as jest.Mock
const mockedShouldRenderCommitment =
  shouldRenderCommitment as unknown as jest.Mock

const renderComponent = (job: JobListItemFragment) => {
  mockedDetailedList.mockImplementation(({ children }) => children)
  mockedDetailedListRow.mockImplementation(({ children }) => children)
  mockedDetailedListItem.mockImplementation(({ label, value, children }) => (
    <div data-testid={label}>{value || children || NO_VALUE}</div>
  ))
  mockedJobFulfillmentStatus.mockReturnValue(null)
  mockedJobStatus.mockReturnValue(null)
  mockedClientLinkField.mockReturnValue(null)
  mockedCommitmentField.mockReturnValue(null)
  mockedJobTypeField.mockReturnValue(null)
  mockedJobContactsField.mockReturnValue(null)
  mockedJobTimeZoneField.mockReturnValue(null)
  mockedTalentField.mockReturnValue(null)
  mockedJobSpecializationField.mockReturnValue(null)
  mockedReadonlySkillList.mockReturnValue(null)
  mockedIndustriesField.mockReturnValue(null)
  mockedUpdateInvoiceNoteModal.mockReturnValue(null)

  return render(
    <TestWrapper>
      <JobItemDetails job={job} />
    </TestWrapper>
  )
}

describe('JobItemDetails', () => {
  it('default render', () => {
    MockDate.set('2022-04-14T01:00:00-04:00')

    mockedShowJobFulfillmentStatus.mockReturnValue(true)
    mockedShouldRenderCommitment.mockReturnValue(true)

    const job = createJobListItemFragment()

    renderComponent(job)

    expect(mockedJobTypeField).toHaveBeenCalledWith({ jobType: job.jobType }, {})
    expect(screen.queryByTestId('Claim Time')).toHaveTextContent(
      '11 months ago'
    )
    expect(screen.queryByTestId('Job Posted')).toHaveTextContent(NO_VALUE)

    expect(screen.getByTestId('Fulfillment Status')).toBeInTheDocument()
    expect(screen.queryByTestId('Status')).not.toBeInTheDocument()
    expect(screen.getByTestId('Job Specialization')).toBeInTheDocument()
    expect(screen.getByTestId('Commitment')).toBeInTheDocument()
    expect(screen.queryByTestId('Desired Commitment')).not.toBeInTheDocument()

    expect(mockedJobFulfillmentStatus).toHaveBeenCalledWith({ job }, {})
    expect(mockedJobStatus).not.toHaveBeenCalled()
    expect(mockedClientLinkField).toHaveBeenCalledWith(
      { client: job.client },
      {}
    )
    expect(mockedCommitmentField).toHaveBeenCalledWith({ job }, {})
    expect(mockedJobContactsField).toHaveBeenCalledWith(
      { contacts: job.contacts?.nodes },
      {}
    )
    expect(mockedJobTimeZoneField).toHaveBeenCalledWith(
      {
        timeZonePreference: job.timeZonePreference,
        hasPreferredHours: job.hasPreferredHours,
        hoursOverlap: job.hoursOverlapEnum
      },
      {}
    )
    expect(mockedTalentField).toHaveBeenCalledWith(
      {
        talentCount: job.talentCount,
        jobEngagements: job.engagements?.nodes
      },
      {}
    )
    expect(mockedJobSpecializationField).toHaveBeenCalledWith(
      { specialization: job.specialization },
      {}
    )
    expect(mockedReadonlySkillList).toHaveBeenCalledWith(
      {
        skillSets: job.skillSets?.nodes
      },
      {}
    )
    expect(mockedIndustriesField).toHaveBeenCalledWith(
      {
        industries: job.industries?.nodes
      },
      {}
    )
    expect(mockedUpdateInvoiceNoteModal).toHaveBeenCalledWith({ job }, {})
  })

  describe('when shouldShowJobFulfillmentStatus is false', () => {
    it('renders JobStatus instead of JobFulfillmentStatus', () => {
      mockedShowJobFulfillmentStatus.mockReturnValue(false)
      mockedShouldRenderCommitment.mockReturnValue(true)

      const job = createJobListItemFragment()

      renderComponent(job)

      expect(screen.getByTestId('Status')).toBeInTheDocument()
      expect(screen.queryByTestId('Fulfillment Status')).not.toBeInTheDocument()

      expect(mockedJobStatus).toHaveBeenCalledWith({ job }, {})
      expect(mockedJobFulfillmentStatus).not.toHaveBeenCalled()
    })
  })

  describe('when shouldRenderCommitmentField is false', () => {
    it('renders JobStatus instead of JobFulfillmentStatus', () => {
      mockedShowJobFulfillmentStatus.mockReturnValue(true)
      mockedShouldRenderCommitment.mockReturnValue(false)

      const job = createJobListItemFragment()

      renderComponent(job)

      expect(screen.getByTestId('Desired Commitment')).toBeInTheDocument()
      expect(screen.queryByTestId('Commitment')).not.toBeInTheDocument()
    })
  })

  describe('when isSpecializable is false', () => {
    it('does not render JobSpecializationField', () => {
      mockedShowJobFulfillmentStatus.mockReturnValue(true)
      mockedShouldRenderCommitment.mockReturnValue(false)

      const job = createJobListItemFragment({ isSpecializable: false })

      renderComponent(job)

      expect(screen.queryByTestId('Job Specialization')).not.toBeInTheDocument()
    })
  })
})
