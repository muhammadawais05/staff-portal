import React from 'react'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { useNotifications } from '@toptal/picasso/utils'
import {
  Maybe,
  OperationCallableTypes,
  SpecialistAssignmentStatuses
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import {
  SpecialistAssignmentFragment,
  TssTalentOperationsFragment
} from '../../data'
import {
  createStaffMock,
  createGetTalentWithScreeningSpecialistMock,
  createGetTalentWithScreeningSpecialistFailedMock,
  createSpecialistOperationsMock,
  createTalentOperationsMock,
  createSpecialistAssignmentMock
} from './data/mocks'
import TalentScreeningSpecialistStatusSection from '.'

const showError = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

const mockUseNotifications = useNotifications as jest.Mock
const sectionTitle = 'Talent Screening Specialist Status'

const talentId = '123'
const specialistName = 'TEST_NAME'
const createTalentMockResponse = ({
  assignment,
  operations
}: {
  assignment?: Maybe<Partial<SpecialistAssignmentFragment>>
  operations?: Partial<TssTalentOperationsFragment>
} = {}) =>
  createGetTalentWithScreeningSpecialistMock({
    talentId,
    assignment:
      assignment === null
        ? null
        : createSpecialistAssignmentMock({
            assignee: createStaffMock({
              id: '123',
              fullName: specialistName
            }),
            ...assignment
          }),
    operations
  })

const arrangeTest = (mock: MockedResponse) =>
  render(
    <TestWrapperWithMocks mocks={[mock]}>
      <TalentScreeningSpecialistStatusSection talentId={talentId} />
    </TestWrapperWithMocks>
  )

describe('TalentScreeningSpecialistStatusSection', () => {
  beforeEach(() => {
    mockUseNotifications.mockReturnValue({ showError })
  })

  it('shows the section title', async () => {
    arrangeTest(createTalentMockResponse())

    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('skeleton-loader')
    )

    expect(screen.getByText(sectionTitle)).toBeInTheDocument()
  })

  describe('when specialist assignment status is ACTIVE', () => {
    beforeEach(() => {
      arrangeTest(createTalentMockResponse())
    })

    it('shows Archive button', async () => {
      expect(
        await screen.findByRole('button', { name: 'Archive' })
      ).toBeInTheDocument()
    })

    it('shows Assign button', async () => {
      expect(
        await screen.findByRole('button', { name: 'Assign' })
      ).toBeInTheDocument()
    })

    it("shows specialist's name", async () => {
      expect(await screen.findByText(specialistName)).toBeInTheDocument()
    })

    it('shows Active status', async () => {
      expect(await screen.findByText('Active')).toBeInTheDocument()
    })
  })

  describe('when specialist assignment status is ARCHIVED', () => {
    beforeEach(() => {
      arrangeTest(
        createTalentMockResponse({
          assignment: {
            status: SpecialistAssignmentStatuses.ARCHIVED,
            operations: createSpecialistOperationsMock({
              archiveSpecialistAssignment: createOperationMock({
                callable: OperationCallableTypes.HIDDEN
              })
            })
          },
          operations: createTalentOperationsMock({
            assignScreeningSpecialistToTalent: createOperationMock({
              callable: OperationCallableTypes.HIDDEN
            })
          })
        })
      )
    })

    it('hides Assign button', () => {
      expect(
        screen.queryByRole('button', { name: 'Assign' })
      ).not.toBeInTheDocument()
    })

    it('hides Archive button', () => {
      expect(
        screen.queryByRole('button', { name: 'Archive' })
      ).not.toBeInTheDocument()
    })

    it("shows specialist's name", async () => {
      expect(await screen.findByText(specialistName)).toBeInTheDocument()
    })

    it('shows Archived status', async () => {
      expect(await screen.findByText('Archived')).toBeInTheDocument()
    })
  })

  describe('when specialist assignment status is NONE', () => {
    beforeEach(() => {
      arrangeTest(
        createTalentMockResponse({
          assignment: { status: SpecialistAssignmentStatuses.NONE }
        })
      )
    })

    it('hides Assign button', () => {
      expect(
        screen.queryByRole('button', { name: 'Assign' })
      ).not.toBeInTheDocument()
    })

    it('hides Archive button', () => {
      expect(
        screen.queryByRole('button', { name: 'Archive' })
      ).not.toBeInTheDocument()
    })
  })

  it('hides section if there is no specialist assignment', async () => {
    arrangeTest(
      createTalentMockResponse({
        assignment: null
      })
    )

    await waitFor(() => {
      expect(screen.getByText(sectionTitle)).toBeInTheDocument()
      expect(
        screen.getByTestId('empty-specialist-assignment-table')
      ).toBeInTheDocument()
    })
  })

  it('hides section if there is no assignee', async () => {
    arrangeTest(
      createTalentMockResponse({
        assignment: { assignee: null }
      })
    )

    await waitFor(() => {
      expect(screen.getByText(sectionTitle)).toBeInTheDocument()
      expect(
        screen.getByTestId('empty-specialist-assignment-table')
      ).toBeInTheDocument()
    })
  })

  it('shows notification error when the query fails', async () => {
    const NOTIFICATION_MESSAGE = 'Unable to fetch screening specialist.'

    arrangeTest(createGetTalentWithScreeningSpecialistFailedMock({ talentId }))

    await waitFor(() => {
      expect(showError).toHaveBeenCalledWith(NOTIFICATION_MESSAGE)
    })
  })
})
